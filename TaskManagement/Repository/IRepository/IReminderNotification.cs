using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
  public interface IReminderNotification
    {
        Task<List<ReminderNotification>> GetAllReminderNotifications();
        Task<ReminderNotification> GetReminderNotification(string id);
        System.Threading.Tasks.Task AddReminderNotification(ReminderNotification item);
        Task<bool> RemoveReminderNotification(string id);
        System.Threading.Tasks.Task UpdateTask1(ReminderNotification item);
    }
}
