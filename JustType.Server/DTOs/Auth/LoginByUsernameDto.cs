using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Auth
{
    public class LoginByUsernameDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        [RegularExpression("^[a-zA-Z0-9_-]+$", ErrorMessage = "Only letters, numbers, _ and - allowed")]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
