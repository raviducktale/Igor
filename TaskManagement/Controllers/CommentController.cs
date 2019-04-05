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
using TaskManagement.Repository.IRepository;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
     

        private readonly ICommentsRepository _commentRepository;
        public CommentController(ICommentsRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetComment()
       {
            IEnumerable<Comments> model = await _commentRepository.GetAllComments();
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
        public async Task<IActionResult> Add([FromBody]CommentsVM cmt)
        {
            return Ok(await _commentRepository.AddComment(cmt));

        }

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] CommentsVM model)
        {
            try
            {
                Comments cmt = new Comments()
                {
                    _id = ObjectId.Parse(model._id),
                    Subject = model.Subject,
                    ResponsiblePerson = model.ResponsiblePerson,
                    Completed=model.Completed
                    
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
