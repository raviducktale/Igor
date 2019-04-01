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
    public class CommentsRepository : ICommentsRepository
    {

        private readonly DBContext _context = null;

        public CommentsRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }

        public async System.Threading.Tasks.Task AddComment(Comments comment)
        {
            try
            {
                await _context.Comments.InsertOneAsync(comment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<List<Comments>> GetAllComments()
        {
            try
            {
                return _context.Comments.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Comments> GetComment(string id)
        {
            try
            {

                FilterDefinition<Comments> filter = Builders<Comments>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Comments.Find(filter).ToList();

                return _context
                    .Comments
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RemoveComment(string id)
        {
            try
            {
                DeleteResult actionResult = await _context.Comments.DeleteOneAsync(
                Builders<Comments>.Filter.Eq("_id", ObjectId.Parse(id)));
                return actionResult.IsAcknowledged
                && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async System.Threading.Tasks.Task UpdateComment(Comments item)
        {
            try
            {
                await _context.Comments.ReplaceOneAsync(b => b._id == item._id, item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
