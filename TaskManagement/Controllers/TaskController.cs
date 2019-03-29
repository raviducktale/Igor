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
    public class TaskController : ControllerBase
    {
        private readonly TaskRepository _taskRepository;
        public TaskController(IOptions<MongoSetting> settings)
        {
            _taskRepository = new TaskRepository(settings); ;
        }

        [HttpGet]
        public async Task<IActionResult> GetTask()
        {
            IEnumerable<Models.Task> model = await _taskRepository.GetAllTasks();
            return Ok(model);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {

            var task = await _taskRepository.GetTask(id);
            if (task == null)
                return new NotFoundResult();
            return new ObjectResult(task);

        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] Models.Task task)
        {
            ObjectId obj = new ObjectId();
            task._id = obj;
            await _taskRepository.AddTask(task);
            return new OkObjectResult(task);
        }

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] TaskVM model)
        {
            try
            {
                Models.Task tsk = new Models.Task()
                {
                    _id = ObjectId.Parse(model._id),
                    TaskText = model.TaskText,
                    ResponsiblePerson = model.ResponsiblePerson,
                    Priority = model.Priority,
                    CreatedBy = model.CreatedBy,
                    UpdatedBy = model.UpdatedBy,
                    CreatedOn = model.CreatedOn,
                    UpdatedOn = model.UpdatedOn,
                    EventStartDate = model.EventStartDate,
                    EventEndDate = model.EventEndDate,
                    Completed = model.Completed,
                    RepeatTaskId = model.RepeatTaskId,
                    ReminderNotificationId = model.ReminderNotificationId

                };


        await _taskRepository.UpdateTask(tsk);
                return new OkObjectResult(tsk);
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
            await _taskRepository.RemoveTask(id);
            return new ObjectResult(id);
        }
    }
}
