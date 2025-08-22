using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Auth
{
    public class RegisterDto
    {
        [Required]
        [MinLength(3)]
        public string Login { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
    }
}
