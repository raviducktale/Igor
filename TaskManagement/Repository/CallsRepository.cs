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
    public class CallsRepository : ICallsRepository
    {
        private readonly DBContext _context = null;

        public CallsRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }



        public Task<List<Calls>> GetAllCall()
        {
            try
            {
                return _context.Calls.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Calls> GetCall(string id)
        {
            try
            {

                FilterDefinition<Calls> filter = Builders<Calls>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Calls.Find(filter).ToList();

                return _context
                    .Calls
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddCall(Calls Call)
        {
            try
            {
                await _context.Calls.InsertOneAsync(Call);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateCall(Calls Call)
        {
            try
            {
                await _context.Calls.ReplaceOneAsync(b => b._id == Call._id, Call);
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
                DeleteResult actionResult = await _context.Calls.DeleteOneAsync(
                Builders<Calls>.Filter.Eq("_id", ObjectId.Parse(id)));
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
