using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Auth
{
    public class LoginDto
    {
        [Required]
        public string Login { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
