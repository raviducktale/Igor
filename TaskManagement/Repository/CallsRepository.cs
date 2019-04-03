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
                //var result = _context.Calls.Find(filter).ToList();

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

        public async Task<Calls> AddCall(CallsVM model)
        {
            try
            {

                model.Description=Regex.Replace(model.Description, @"<[^>]+>| ", "").TrimStart();
                Calls _call = new Calls()
                {
                    CreatedDate = DateTime.Now,
                    CreatedBy = 1,
                    Types = model.Types,
                    CallId = model.CallId,
                    CallSubject = model.CallSubject,
                    ResponsiblePerson = model.ResponsiblePerson,
                    Priority = model.Priority,
                    EventStartDate = model.EventStartDate,
                    EventEndDate = model.EventEndDate,
                    RepeatTask = model.RepeatTask,
                    ReminderNotification = model.ReminderNotification,
                    Completed = model.Completed,
                    Description = model.Description
                };
                await _context.Calls.InsertOneAsync(_call);
                return _call;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Calls> SetPriority(CallsVM model)
        {
            try
            {
                FilterDefinition<Calls> filter = Builders<Calls>.Filter.Eq("_id", ObjectId.Parse(model._id));
                var result = _context.Calls.Find(filter).FirstOrDefaultAsync().Result;

                //await _context.Calls.InsertOneAsync(_call);
                return result;
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
                Call.UpdatedDate = DateTime.Now;
                Call.UpdatedBy = 1;
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
