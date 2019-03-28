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


        public async System.Threading.Tasks.Task AddTask(Models.Task task)
        {
            try
            {
                await _context.Task.InsertOneAsync(task);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<List<Models.Task>> GetAllTasks()
        {
            try
            {
                return _context.Task.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Models.Task> GetTask(string id)
        {
            try
            {

                FilterDefinition<Models.Task> filter = Builders<Models.Task>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Task.Find(filter).ToList();

                return _context
                    .Task
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
                DeleteResult actionResult = await _context.Task.DeleteOneAsync(
                Builders<Models.Task>.Filter.Eq("_id", ObjectId.Parse(id)));
                return actionResult.IsAcknowledged
                && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async System.Threading.Tasks.Task UpdateTask(Models.Task item)
        {
            try
            {
                await _context.Task.ReplaceOneAsync(b => b._id == item._id, item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
