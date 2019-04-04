using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;

namespace TaskManagement.Repository.IRepository
{
   public interface ICommentsRepository
    {
        Task<List<Comments>> GetAllComments();
        Task<Comments> GetComment(string id);
        Task<Comments> AddComment(CommentsVM item);
        Task<bool> RemoveComment(string id);
        Task UpdateComment(Comments item);

      
    }
}
