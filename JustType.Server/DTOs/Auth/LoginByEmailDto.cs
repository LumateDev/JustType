using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Auth
{
    public class LoginByEmailDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
