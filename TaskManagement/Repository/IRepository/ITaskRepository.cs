using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
  public interface ITaskRepository
    {
        Task<List<Models.Tasks>> GetAllTasks();
        Task<Models.Tasks> GetTask(string id);
        System.Threading.Tasks.Task AddTask(Models.Tasks item);
        Task<bool> RemoveTask(string id);
        System.Threading.Tasks.Task UpdateTask(Models.Tasks item);
    }
}
