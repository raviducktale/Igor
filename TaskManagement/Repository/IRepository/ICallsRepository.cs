using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
   public interface ICallsRepository
    {
        Task<List<Calls>> GetAllCall();
        Task<Calls> GetCall(string id);
        Task AddCall(Calls item);
        Task UpdateCall(Calls item);
        Task<bool> RemoveCall(string id);
    }
}
