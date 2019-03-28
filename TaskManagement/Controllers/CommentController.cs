using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;
using TaskManagement.Repository;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {


        private readonly CommentRepository _commentRepository;
        public CommentController(IOptions<MongoSetting> settings)
        {
            _commentRepository = new CommentRepository(settings); ;
        }

        [HttpGet]
        public async Task<IActionResult> GetComment()
        {
            IEnumerable<Comment> model = await _commentRepository.GetAllComments();
            return Ok(model);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {

            var Comment = await _commentRepository.GetComment(id);
            if (Comment == null)
                return new NotFoundResult();
            return new ObjectResult(Comment);

        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody]Comment cmt)
        {
            ObjectId obj = new ObjectId();
            cmt._id = obj;
            await _commentRepository.AddComment(cmt);
            return new OkObjectResult(cmt);
        }

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] CommentVM model)
        {
            try
            {
                Comment cmt = new Comment()
                {
                    _id = ObjectId.Parse(model._id),
                    CommentText = model.CommentText,
                    ResponsiblePerson = model.ResponsiblePerson,
                    CreatedBy = model.CreatedBy,
                    UpdatedBy = model.UpdatedBy,
                    CreatedOn = model.CreatedOn,
                    UpdatedOn = model.UpdatedOn,

                };


                await _commentRepository.UpdateComment(cmt);
                return new OkObjectResult(cmt);
            }
            catch (Exception ex)
            {

            }
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _commentRepository.RemoveComment(id);
            return new ObjectResult(id);
        }
    }

}
