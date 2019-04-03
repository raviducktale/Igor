using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;

namespace TaskManagement.Repository.IRepository
{
   public interface IMeetingsRepository
    {
        Task<List<Meetings>> GetAllMeetings();
        Task<Meetings> GetMeeting(string id);
        Task<Meetings> AddMeeting(MeetingsVM item);
        Task UpdateMeeting(Meetings item);
        Task<bool> RemoveMeeting(string id);
       
    }
}
