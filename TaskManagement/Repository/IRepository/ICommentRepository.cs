using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
   public interface ICommentRepository
    {
        Task<List<Comment>> GetAllComments();
        Task<Comment> GetComment(string id);
        System.Threading.Tasks.Task AddComment(Comment item);
        Task<bool> RemoveComment(string id);
        System.Threading.Tasks.Task UpdateComment(Comment item);
    }
}
