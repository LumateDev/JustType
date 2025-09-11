using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Auth
{
    public class LoginByUsernameDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
