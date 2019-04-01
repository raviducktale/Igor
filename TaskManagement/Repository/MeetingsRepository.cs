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

        public async Task AddMeeting(Meetings Meeting)
        {
            try
            {
                await _context.Meetings.InsertOneAsync(Meeting);
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
