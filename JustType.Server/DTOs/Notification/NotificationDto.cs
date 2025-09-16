using JustType.Server.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Notification
{
    public class NotificationDto
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Message { get; set; } = string.Empty;

        [Required]
        public NotificationType Type { get; set; }

        [Required]
        public NotificationStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
        public Guid UserId { get; set; }
       
    }
}
