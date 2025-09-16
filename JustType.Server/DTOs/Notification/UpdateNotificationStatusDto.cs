using JustType.Server.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace JustType.Server.DTOs.Notification
{
    public class UpdateNotificationStatusDto
    {
        [Required]
        public NotificationStatus Status { get; set; }
    }

}
