using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
   public interface IRepeatTaskRepository
    {
        Task<List<RepeatTask>> GetAllRepeatTasks();
        Task<RepeatTask> GetRepeatTask(string id);
        System.Threading.Tasks.Task AddRepeatTask(RepeatTask item);
        Task<bool> RemoveRepeatTask(string id);
        System.Threading.Tasks.Task UpdateRepeatTask1(RepeatTask item);
    }
}
