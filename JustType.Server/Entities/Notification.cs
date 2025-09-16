using JustType.Server.Entities.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JustType.Server.Entities
{
    public class Notification
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = String.Empty;

        [Required]
        [MaxLength(1000)]
        public string Message {  get; set; } = String.Empty;

        [Required]
        public NotificationType Type { get; set; }

        [Required]
        public NotificationStatus Status { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ReadAt {  get; set; }

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        public void MarkAsRead()
        {
            if (Status == NotificationStatus.Unread)
            {
                Status = NotificationStatus.Read;
                ReadAt = DateTime.UtcNow;
            }
        }

        public void Archive()
        {
            Status = NotificationStatus.Archived;
        }
    }

}
