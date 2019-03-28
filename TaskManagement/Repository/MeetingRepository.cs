using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Repository.IRepository;

namespace TaskManagement.Repository
{
    public class MeetingRepository : IMeetingRepository
    {
        private readonly DBContext _context = null;
        public MeetingRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }

       

        public Task<List<Meeting>> GetAllMeetings()
        {
            try
            {
                return _context.Meeting.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Meeting> GetMeeting(string id)
        {
            try
            {

                FilterDefinition<Meeting> filter = Builders<Meeting>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Meeting.Find(filter).ToList();

                return _context
                    .Meeting
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task AddMeeting(Meeting Meeting)
        {
            try
            {
                await _context.Meeting.InsertOneAsync(Meeting);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateMeeting(Meeting Meeting)
        {
            try
            {
                await _context.Meeting.ReplaceOneAsync(b => b._id == Meeting._id, Meeting);
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
                DeleteResult actionResult = await _context.Meeting.DeleteOneAsync(
                Builders<Meeting>.Filter.Eq("_id", ObjectId.Parse(id)));
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
