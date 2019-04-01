using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;

namespace TaskManagement.Repository.IRepository
{
   public interface ICallsRepository
    {
        Task<List<Calls>> GetAllCall();
        Task<Calls> GetCall(string id);
        Task<Calls> AddCall(CallsVM item);
        Task UpdateCall(Calls item);
        Task<bool> RemoveCall(string id);
    }
}
