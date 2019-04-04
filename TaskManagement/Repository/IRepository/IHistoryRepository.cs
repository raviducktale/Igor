using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
   public interface IHistoryRepository
    {
        Task<List<History>> GetAllHistory();
        Task<History> GetHistory(string id);
        Task<History> AddHistory(HistoryVM item);
        Task UpdateHistory(History item);
        Task<bool> RemoveHistory(string id);
    }
}
