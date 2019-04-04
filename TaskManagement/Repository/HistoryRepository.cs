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
    public class HistoryRepository : IHistoryRepository
    {
        private readonly DBContext _context = null;
        public HistoryRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }

        public async Task<History> AddHistory(HistoryVM model)
        {
            try
            {

                History _history = new History()
                {
                    CreatedDate = DateTime.Now,
                    CreatedBy = 1,
                    Subject=model.Subject,
                    Action=model.Action,
                    Panel=model.Panel,
                    Button=model.Button,
                   
                };
                await _context.History.InsertOneAsync(_history);
                return _history;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<List<History>> GetAllHistory()
        {
            try
            {
                return _context.History.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<History> GetHistory(string id)
        {
            try
            {

                FilterDefinition<History> filter = Builders<History>.Filter.Eq("_id", ObjectId.Parse(id));
                //var result = _context.Calls.Find(filter).ToList();

                return _context
                    .History
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RemoveHistory(string id)
        {
            try
            {
                DeleteResult actionResult = await _context.History.DeleteOneAsync(
                Builders<History>.Filter.Eq("_id", ObjectId.Parse(id)));
                return actionResult.IsAcknowledged
                && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateHistory(History history)
        {
            try
            {
                history.CreatedDate = DateTime.Now;
                history.CreatedBy = 1;
                await _context.History.ReplaceOneAsync(b => b._id == history._id, history);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
