using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Auth
{
    public class RegisterDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        [RegularExpression("^[a-zA-Z0-9_-]+$", ErrorMessage = "Only letters, numbers, _ and - allowed")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(50)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
    }
}
