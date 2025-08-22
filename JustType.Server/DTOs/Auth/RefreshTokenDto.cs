using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Auth
{
    public class RefreshTokenDto
    {
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
    }
}
