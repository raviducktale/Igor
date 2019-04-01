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
    public class TaskRepository : ITaskRepository
    {

        private readonly DBContext _context = null;

        public TaskRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }


        public async System.Threading.Tasks.Task AddTask(Models.Tasks task)
        {
            try
            {
                await _context.Tasks.InsertOneAsync(task);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<List<Models.Tasks>> GetAllTasks()
        {
            try
            {
                return _context.Tasks.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Models.Tasks> GetTask(string id)
        {
            try
            {

                FilterDefinition<Models.Tasks> filter = Builders<Models.Tasks>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Tasks.Find(filter).ToList();

                return _context
                    .Tasks
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RemoveTask(string id)
        {
            try
            {
                DeleteResult actionResult = await _context.Tasks.DeleteOneAsync(
                Builders<Models.Tasks>.Filter.Eq("_id", ObjectId.Parse(id)));
                return actionResult.IsAcknowledged
                && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async System.Threading.Tasks.Task UpdateTask(Models.Tasks item)
        {
            try
            {
                await _context.Tasks.ReplaceOneAsync(b => b._id == item._id, item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
