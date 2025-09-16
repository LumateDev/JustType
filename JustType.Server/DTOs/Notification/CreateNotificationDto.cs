using JustType.Server.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Notification
{
    public class CreateNotificationDto
    {
        [Required(ErrorMessage = "Title is required")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Message is required")]
        [MaxLength(1000, ErrorMessage = "Message cannot exceed 1000 characters")]
        public string Message { get; set; } = string.Empty;

        [Required(ErrorMessage = "Type is required")]
        public NotificationType Type { get; set; }

        public Guid? UserId { get; set; }
    }

}
