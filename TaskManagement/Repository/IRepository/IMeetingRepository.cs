using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Repository.IRepository
{
   public interface IMeetingRepository
    {
        Task<List<Meeting>> GetAllMeetings();
        Task<Meeting> GetMeeting(string id);
        Task AddMeeting(Meeting item);
        Task<bool> RemoveMeeting(string id);
        Task UpdateMeeting(Meeting item);
    }
}
