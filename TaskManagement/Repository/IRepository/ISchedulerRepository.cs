using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;

namespace TaskManagement.Repository.IRepository
{
   public interface ISchedulerRepository
    {
        Task<List<Scheduler>> GetAllScheduler();
        Task<Scheduler> GetScheduler(string id);
        Task<Scheduler> AddScheduler(SchedulerVM item);
        Task<bool> RemoveScheduler(string id);
        Task UpdateScheduler(Scheduler item);
        Task<List<Scheduler>> getList();
    }
}
