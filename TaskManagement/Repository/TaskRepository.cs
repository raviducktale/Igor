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
    public class TaskRepository : ITaskRepository
    {

        private readonly DBContext _context = null;

        public TaskRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }


        public async Task<Tasks> AddTask(TasksVM model)
        {
            try
            {

                model.Description = Regex.Replace(model.Description, @"<[^>]+>| ", "").TrimStart();
                Tasks _tasks = new Tasks()
                {
                    CreatedDate = DateTime.Now,
                    CreatedBy = 1,
                    Subject = model.Subject,
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
                    RemindTo = model.RemindTo

                };


                await _context.Tasks.InsertOneAsync(_tasks);
                return _tasks;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<List<Tasks>> GetAllTasks()
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

        public Task<Tasks> GetTask(string id)
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

        public async Task UpdateTask(Models.Tasks item)
        {
            try
            {
                item.UpdatedDate = DateTime.Now;
                item.UpdatedBy = 1;
                await _context.Tasks.ReplaceOneAsync(b => b._id == item._id, item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
