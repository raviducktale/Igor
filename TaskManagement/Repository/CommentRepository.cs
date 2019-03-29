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
    public class CommentRepository : ICommentRepository
    {

        private readonly DBContext _context = null;

        public CommentRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }

        public async System.Threading.Tasks.Task AddComment(Comment comment)
        {
            try
            {
                await _context.Comment.InsertOneAsync(comment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<List<Comment>> GetAllComments()
        {
            try
            {
                return _context.Comment.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Comment> GetComment(string id)
        {
            try
            {

                FilterDefinition<Comment> filter = Builders<Comment>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Comment.Find(filter).ToList();

                return _context
                    .Comment
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
                DeleteResult actionResult = await _context.Comment.DeleteOneAsync(
                Builders<Comment>.Filter.Eq("_id", ObjectId.Parse(id)));
                return actionResult.IsAcknowledged
                && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async System.Threading.Tasks.Task UpdateComment(Comment item)
        {
            try
            {
                await _context.Comment.ReplaceOneAsync(b => b._id == item._id, item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
