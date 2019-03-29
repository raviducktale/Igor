using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
   public interface IMeetingsRepository
    {
        Task<List<Meetings>> GetAllMeetings();
        Task<Meetings> GetMeeting(string id);
        Task AddMeeting(Meetings item);
        Task<bool> RemoveMeeting(string id);
        Task UpdateMeeting(Meetings item);
    }
}
