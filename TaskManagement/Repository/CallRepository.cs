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
    public class CallRepository : ICallRepository
    {
        private readonly DBContext _context = null;

        public CallRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }



        public Task<List<Call>> GetAllCall()
        {
            try
            {
                return _context.Call.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Call> GetCall(string id)
        {
            try
            {

                FilterDefinition<Call> filter = Builders<Call>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Call.Find(filter).ToList();

                return _context
                    .Call
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddCall(Call Call)
        {
            try
            {
                await _context.Call.InsertOneAsync(Call);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateCall(Call Call)
        {
            try
            {
                await _context.Call.ReplaceOneAsync(b => b._id == Call._id, Call);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RemoveCall(string id)
        {
            try
            {
                DeleteResult actionResult = await _context.Call.DeleteOneAsync(
                Builders<Call>.Filter.Eq("_id", ObjectId.Parse(id)));
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
