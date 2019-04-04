using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;

namespace TaskManagement.Repository.IRepository
{
    public interface ITaskRepository
    {
        Task<List<Tasks>> GetAllTasks();
        Task<Tasks> GetTask(string id);
        Task<Tasks> AddTask(TasksVM item);
        Task<bool> RemoveTask(string id);
        Task UpdateTask(Tasks item);
    }
}
