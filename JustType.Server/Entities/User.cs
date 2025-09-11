using JustType.Server.Entities.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace JustType.Server.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(50)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public UserStatus Status { get; set; } = UserStatus.Active;

        [Required]
        public UserRole Role { get; set; } = UserRole.User;
    }
}