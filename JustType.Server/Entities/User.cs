using JustType.Server.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace JustType.Server.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Login { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public UserStatus Status { get; set; } = UserStatus.Active;

        public UserRole Role { get; set; } = UserRole.User;
    }
}