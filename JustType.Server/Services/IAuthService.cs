using JustType.Server.DTOs.Auth;
using JustType.Server.Entities;

namespace JustType.Server.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterDto registerDto);
        Task<LoginResponseDto?> LoginAsync(LoginDto loginDto);
        Task<LoginResponseDto?> RefreshTokenAsync(string refreshToken);
        Task<bool> RevokeRefreshTokenAsync(string refreshToken);
    }
}
