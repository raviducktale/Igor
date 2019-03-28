using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
  public interface ITaskRepository
    {
        Task<List<Models.Task>> GetAllTasks();
        Task<Models.Task> GetTask(string id);
        System.Threading.Tasks.Task AddTask(Models.Task item);
        Task<bool> RemoveTask(string id);
        System.Threading.Tasks.Task UpdateTask(Models.Task item);
    }
}
