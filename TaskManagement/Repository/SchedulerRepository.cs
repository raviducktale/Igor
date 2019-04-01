using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;
using TaskManagement.Repository.IRepository;

namespace TaskManagement.Repository
{
    public class SchedulerRepository : ISchedulerRepository
    {
        private readonly DBContext _context = null;
        public SchedulerRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }


        public async Task<Scheduler> AddScheduler(SchedulerVM model)
        {
           
                try
                {
                Scheduler _scheduler = new Scheduler()
                {
                   
                    Subject = model.Subject,
                    StartTime = model.StartTime,
                    EndTime = model.EndTime,
                    startTimezone = model.startTimezone,
                    endTimezone = model.endTimezone,
                    Location = model.Location,
                    Description = model.Description,
                    IsAllDay = model.IsAllDay,
                    RecurrenceID = model.RecurrenceID,
                    RecurrenceRule = model.RecurrenceRule,
                    Frequency = model.Frequency,
                    Interval = model.Interval,
                    Count = model.Count,
                    IsReadonly = model.IsReadonly,
                    IsBlock = model.IsBlock,
                    Untill = model.Untill,
                    ByDay = model.ByDay,
                    BYMonthDay = model.BYMonthDay,
                    BYMonth = model.BYMonth,
                    BYSetPOS = model.BYSetPOS,

                };
                    await _context.Scheduler.InsertOneAsync(_scheduler);
                    return _scheduler;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
           
        }

        public Task<List<Scheduler>> GetAllScheduler()
        {
            try
            {
                return _context.Scheduler.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Scheduler> GetScheduler(string id)
        {
            try
            {

                FilterDefinition<Scheduler> filter = Builders<Scheduler>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Scheduler.Find(filter).ToList();

                return _context
                    .Scheduler
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RemoveScheduler(string id)
        {
            try
            {
                DeleteResult actionResult = await _context.Scheduler.DeleteOneAsync(
                Builders<Scheduler>.Filter.Eq("_id", ObjectId.Parse(id)));
                return actionResult.IsAcknowledged
                && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateScheduler(Scheduler item)
        {
            try
            {
                await _context.Scheduler.ReplaceOneAsync(b => b._id == item._id, item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
