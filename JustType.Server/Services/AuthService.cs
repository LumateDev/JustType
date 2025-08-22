using JustType.Server.Data;
using JustType.Server.DTOs.Auth;
using JustType.Server.Entities;
using JustType.Server.Entities.Enums;
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

        public async Task<LoginResponseDto?> LoginAsync(LoginDto loginDto)
        {
            if (loginDto == null) throw new ArgumentNullException(nameof(loginDto));

            _logger.LogInformation("Login attempt for user: {Login}", loginDto.Login);

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Login == loginDto.Login);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                _logger.LogWarning("Login failed for user: {Login}", loginDto.Login);
                return null;
            }

            if (user.Status != UserStatus.Active)
            {
                _logger.LogWarning("Login failed: User {Login} is not active", loginDto.Login);
                return null;
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

            _logger.LogInformation("User {Login} successfully logged in", loginDto.Login);

            return new LoginResponseDto
            {
                AccessToken = _tokenService.CreateToken(user),
                RefreshToken = refreshToken.Token,
                ExpiresIn = 900 // 15 минут в секундах
            };
        }

        public async Task<LoginResponseDto?> RefreshTokenAsync(string refreshToken)
        {
            var storedToken = await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (storedToken == null || !storedToken.IsActive)
            {
                _logger.LogWarning("Invalid or expired refresh token");
                return null;
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

        public async Task<User?> RegisterAsync(RegisterDto registerDto)
        {
            if (registerDto == null) throw new ArgumentNullException(nameof(registerDto));

            if (await _context.Users.AnyAsync(u => u.Login == registerDto.Login))
                return null;

            var user = new User
            {
                Id = Guid.NewGuid(),
                Login = registerDto.Login.Trim(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                Role = UserRole.User,
                Status = UserStatus.Active
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}