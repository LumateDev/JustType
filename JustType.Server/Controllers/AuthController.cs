using JustType.Server.DTOs.Auth;
using JustType.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JustType.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            try
            {
                var user = await _authService.RegisterAsync(registerDto);
                if (user == null)
                    return BadRequest(new { Message = "User with this username already exists." });

                return Ok(new { Message = "User registered successfully.", UserId = user.Id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during registration");
                return StatusCode(500, new { Message = "An error occurred during registration." });
            }
        }

        [HttpPost("login/username")]
        public async Task<IActionResult> LoginByUsername(LoginByUsernameDto loginDto)
        {
            try
            {
                var result = await _authService.LoginAsync(loginDto);
                if (result == null)
                    return Unauthorized(new { Message = "Invalid username or password." });

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, new { Message = "An error occurred during login." });
            }
        }

        [HttpPost("login/email")]
        public async Task<IActionResult> LoginByEmail (LoginByEmailDto loginDto)
        {
            try
            {
                var result = await _authService.LoginAsync(loginDto);
                if (result == null)
                    return Unauthorized(new { Message = "Invalid email or password." });

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, new { Message = "An error occurred during login." });
            }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var result = await _authService.RefreshTokenAsync(refreshTokenDto.RefreshToken);
                if (result == null)
                    return Unauthorized(new { Message = "Invalid refresh token." });

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during token refresh");
                return StatusCode(500, new { Message = "An error occurred during token refresh." });
            }
        }

        [HttpPost("revoke")]
        [Authorize]
        public async Task<IActionResult> RevokeToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var result = await _authService.RevokeRefreshTokenAsync(refreshTokenDto.RefreshToken);
                if (!result)
                    return BadRequest(new { Message = "Invalid refresh token." });

                return Ok(new { Message = "Token revoked successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during token revocation");
                return StatusCode(500, new { Message = "An error occurred during token revocation." });
            }
        }

        [HttpGet("profile")]
        [Authorize]
        public IActionResult GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userLogin = User.FindFirstValue(ClaimTypes.Name);
            var userRole = User.FindFirstValue(ClaimTypes.Role);

            if (userId == null) return Unauthorized();

            return Ok(new { Id = userId, Login = userLogin, Role = userRole });
        }
    }
}