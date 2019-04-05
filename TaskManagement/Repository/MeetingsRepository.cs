using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;
using TaskManagement.Repository.IRepository;

namespace TaskManagement.Repository
{
    public class MeetingsRepository : IMeetingsRepository
    {
        private readonly DBContext _context = null;
        public MeetingsRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }
       

        public Task<List<Meetings>> GetAllMeetings()
        {
            try
            {
                return _context.Meetings.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Meetings> GetMeeting(string id)
        {
            try
            {

                FilterDefinition<Meetings> filter = Builders<Meetings>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Meetings.Find(filter).ToList();

                return _context
                    .Meetings
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<Meetings> AddMeeting(MeetingsVM model)
        {
            try
            {
                model.Description = Regex.Replace(model.Description, @"<[^>]+>| ", "").TrimStart();
                Meetings _meeting = new Meetings()
                {
                    CreatedDate = DateTime.Now,
                    CreatedBy = 1,
                    Subject = model.Subject,
                    Location = model.Location,
                    ResponsiblePerson = model.ResponsiblePerson,
                    Priority = model.Priority,
                    EventStartDate = model.EventStartDate,
                    EventEndDate = model.EventEndDate,
                    ReminderNotification = model.ReminderNotification,
                    Completed = model.Completed,
                    Description = model.Description,
                    RepeatTask = model.RepeatTask,
                    Interval = model.Interval,
                    RepeatAfter = model.RepeatAfter,
                    Untill = model.Untill,
                    UntillDate = model.UntillDate,
                    UntillCompile = model.UntillCompile,
                    RemindUsing = model.RemindUsing,
                    RemindTo = model.RemindTo,


                    RepeatEvery = model.RepeatEvery,
                    RepeatOnWeekDay = model.RepeatOnWeekDay,
                    RepeatOnDay = model.RepeatOnDay,
                    WillRepeat = model.WillRepeat,
                    WillRepeatWeekDay = model.WillRepeatWeekDay,
                    RepeatOnMonth = model.RepeatOnMonth

                };
                await _context.Meetings.InsertOneAsync(_meeting);
                return _meeting;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public async Task UpdateMeeting(Meetings Meeting)
        {
            try
            {
                Meeting.UpdatedDate = DateTime.Now;
                Meeting.UpdatedBy = 1;
                await _context.Meetings.ReplaceOneAsync(b => b._id == Meeting._id, Meeting);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RemoveMeeting(string id)
        {
            try
            {
                DeleteResult actionResult = await _context.Meetings.DeleteOneAsync(
                Builders<Meetings>.Filter.Eq("_id", ObjectId.Parse(id)));
                return actionResult.IsAcknowledged
                && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
