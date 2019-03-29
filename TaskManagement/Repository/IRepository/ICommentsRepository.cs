using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
   public interface ICommentsRepository
    {
        Task<List<Comments>> GetAllComments();
        Task<Comments> GetComment(string id);
        System.Threading.Tasks.Task AddComment(Comments item);
        Task<bool> RemoveComment(string id);
        System.Threading.Tasks.Task UpdateComment(Comments item);
    }
}
