using JustType.Server.DTOs.Notification;
using JustType.Server.Entities;
using JustType.Server.Entities.Enums;

namespace JustType.Server.Services
{
    public interface INotificationService
    {
        Task<Notification> CreateNotificationAsync(CreateNotificationDto createDto, Guid? currentUserId = null);
        Task<NotificationDto> GetNotificationByIdAsync(Guid id, Guid userId);
        Task<IEnumerable<NotificationDto>> GetUserNotificationsAsync(Guid userId, int page = 1, int pageSize = 20);
        Task<IEnumerable<NotificationDto>> GetUnreadNotificationsAsync(Guid userId);
        Task<NotificationCountDto> GetNotificationCountAsync(Guid userId);
        Task MarkAsReadAsync(Guid id, Guid userId);
        Task MarkAllAsReadAsync(Guid userId);
        Task ArchiveNotificationAsync(Guid id, Guid userId);
        Task DeleteNotificationAsync(Guid id, Guid userId);

    }

}