using JustType.Server.Data;
using JustType.Server.DTOs.Notification;
using JustType.Server.Entities;
using JustType.Server.Entities.Enums;
using Microsoft.EntityFrameworkCore;

namespace JustType.Server.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(AppDbContext context, ILogger<NotificationService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Notification> CreateNotificationAsync(CreateNotificationDto createDto, Guid? currentUserId = null)
        {
            var userId = createDto.UserId ?? currentUserId;
            if (userId == null)
                throw new ArgumentException("User ID is required");

            // Проверка существования пользователя
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId.Value);
            if (!userExists)
                throw new ArgumentException("User not found");

            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                Title = createDto.Title,
                Message = createDto.Message,
                Type = createDto.Type,
                Status = NotificationStatus.Unread,
                CreatedAt = DateTime.UtcNow,
                UserId = userId.Value,
            };

            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Notification created for user {UserId}", userId);
            return notification;
        }

        public async Task<NotificationDto> GetNotificationByIdAsync(Guid id, Guid userId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (notification == null)
                throw new KeyNotFoundException("Notification not found");

            return MapToDto(notification);
        }

        public async Task<IEnumerable<NotificationDto>> GetUserNotificationsAsync(Guid userId, int page = 1, int pageSize = 20)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return notifications.Select(MapToDto);
        }

        public async Task<IEnumerable<NotificationDto>> GetUnreadNotificationsAsync(Guid userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId && n.Status == NotificationStatus.Unread)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return notifications.Select(MapToDto);
        }

        public async Task<NotificationCountDto> GetNotificationCountAsync(Guid userId)
        {
            var total = await _context.Notifications
                .CountAsync(n => n.UserId == userId);

            var unread = await _context.Notifications
                .CountAsync(n => n.UserId == userId && n.Status == NotificationStatus.Unread);

            return new NotificationCountDto { Total = total, Unread = unread };
        }

        public async Task MarkAsReadAsync(Guid id, Guid userId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (notification == null)
                throw new KeyNotFoundException("Notification not found");

            notification.MarkAsRead();
            await _context.SaveChangesAsync();
        }

        public async Task MarkAllAsReadAsync(Guid userId)
        {
            var unreadNotifications = await _context.Notifications
                .Where(n => n.UserId == userId && n.Status == NotificationStatus.Unread)
                .ToListAsync();

            foreach (var notification in unreadNotifications)
            {
                notification.MarkAsRead();
            }

            await _context.SaveChangesAsync();
        }

        public async Task ArchiveNotificationAsync(Guid id, Guid userId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (notification == null)
                throw new KeyNotFoundException("Notification not found");

            notification.Archive();
            await _context.SaveChangesAsync();
        }

        public async Task DeleteNotificationAsync(Guid id, Guid userId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (notification == null)
                throw new KeyNotFoundException("Notification not found");

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
        }


        private NotificationDto MapToDto(Notification notification)
        {
            return new NotificationDto
            {
                Id = notification.Id,
                Title = notification.Title,
                Message = notification.Message,
                Type = notification.Type,
                Status = notification.Status,
                CreatedAt = notification.CreatedAt,
                ReadAt = notification.ReadAt,
                UserId = notification.UserId,
            };
        }
    }
}
