using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
   public interface ICallRepository
    {
        Task<List<Call>> GetAllCall();
        Task<Call> GetCall(string id);
        Task AddCall(Call item);
        Task UpdateCall(Call item);
        Task<bool> RemoveCall(string id);
    }
}
