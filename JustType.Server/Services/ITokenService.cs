using JustType.Server.Entities;

namespace JustType.Server.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
        string GenerateRefreshToken();
    }
}
