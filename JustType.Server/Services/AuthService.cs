using JustType.Server.Data;
using JustType.Server.DTOs.Auth;
using JustType.Server.Entities;
using JustType.Server.Entities.Enums;
using JustType.Server.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace JustType.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(AppDbContext context, ITokenService tokenService, ILogger<AuthService> logger)
        {
            _context = context;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginByUsernameDto loginDto)
        {
            return await LoginInternalAsync(loginDto.Username, loginDto.Password);
        }

        public async Task<LoginResponseDto> LoginAsync(LoginByEmailDto loginDto)
        {
            return await LoginInternalAsync(loginDto.Email, loginDto.Password);
        }

        private async Task<LoginResponseDto> LoginInternalAsync(string identifier, string password)
        {
            if (string.IsNullOrEmpty(identifier))
                throw new ArgumentNullException(nameof(identifier));
            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException(nameof(password));

            var normalizedIdentifier = identifier.ToLowerInvariant().Trim();

            _logger.LogInformation("Login attempt for: {Identifier}", normalizedIdentifier);

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == normalizedIdentifier || u.Email == normalizedIdentifier);

            if (user == null)
            {
                _logger.LogWarning("User not found: {Identifier}", identifier);
                throw new UserNotFoundException(identifier);
            }

            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                _logger.LogWarning("Login failed for user: {Identifier}", identifier);
                throw new InvalidPasswordException(identifier);
            }

            if (user.Status != UserStatus.Active)
            {
                _logger.LogWarning("Login failed: User {Identifier} is not active", identifier);
                throw new UserNotActiveException(identifier);
            }

            // Удаляем старые refresh токены пользователя
            var oldTokens = _context.RefreshTokens.Where(rt => rt.UserId == user.Id);
            _context.RefreshTokens.RemoveRange(oldTokens);

            // Создаем новый refresh token
            var refreshToken = new RefreshToken
            {
                Id = Guid.NewGuid(),
                Token = _tokenService.GenerateRefreshToken(),
                Expires = DateTime.UtcNow.AddDays(7),
                UserId = user.Id
            };

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            _logger.LogInformation("User {Identifier} successfully logged in", identifier);

            return new LoginResponseDto
            {
                AccessToken = _tokenService.CreateToken(user),
                RefreshToken = refreshToken.Token,
                ExpiresIn = 900 
            };
        }

        public async Task<User> RegisterAsync(RegisterDto registerDto)
        {
            if (registerDto == null)
                throw new ArgumentNullException(nameof(registerDto));

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                Role = UserRole.User,
                Status = UserStatus.Active
            };

            user.Normalize();

            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                _logger.LogWarning("Username already exists: {Username}", user.Username);
                throw new UserAlreadyExistsException($"Username '{registerDto.Username}' is already taken.");
            }

            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                _logger.LogWarning("Email already exists: {Email}", user.Email);
                throw new UserAlreadyExistsException($"Email '{registerDto.Email}' is already registered.");
            }

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<LoginResponseDto> RefreshTokenAsync(string refreshToken)
        {
            var storedToken = await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (storedToken == null || !storedToken.IsActive)
            {
                _logger.LogWarning("Invalid or expired refresh token");
                throw new InvalidRefreshTokenException();
            }

            // Отзываем старый refresh token
            storedToken.Revoked = DateTime.UtcNow;

            // Создаем новый refresh token
            var newRefreshToken = new RefreshToken
            {
                Id = Guid.NewGuid(),
                Token = _tokenService.GenerateRefreshToken(),
                Expires = DateTime.UtcNow.AddDays(7),
                UserId = storedToken.UserId
            };

            _context.RefreshTokens.Add(newRefreshToken);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Refresh token used for user: {UserId}", storedToken.UserId);

            return new LoginResponseDto
            {
                AccessToken = _tokenService.CreateToken(storedToken.User),
                RefreshToken = newRefreshToken.Token,
                ExpiresIn = 900
            };
        }

        public async Task<bool> RevokeRefreshTokenAsync(string refreshToken)
        {
            var storedToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (storedToken == null || !storedToken.IsActive)
                return false;

            storedToken.Revoked = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            _logger.LogInformation("Refresh token revoked for user: {UserId}", storedToken.UserId);
            return true;
        }
    }
}