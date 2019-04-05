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
            IEnumerable<Models.Tasks> model = await _taskRepository.GetAllTasks();
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
        public async Task<IActionResult> Add([FromBody] TasksVM task)
        {
            return Ok(await _taskRepository.AddTask(task));
        }

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] TasksVM model)
        {
            try
            {
                Models.Tasks tsk = new Models.Tasks()
                {
                    _id = ObjectId.Parse(model._id),
                    Subject = model.Subject,
                    ResponsiblePerson = model.ResponsiblePerson,
                    Priority = model.Priority,
                    //CreatedBy = model.CreatedBy,
                    ////UpdatedBy = model.UpdatedBy,
                    //CreatedDate = model.CreatedDate,
                    //UpdatedDate = model.UpdatedDate,
                    EventStartDate = model.EventStartDate,
                    EventEndDate = model.EventEndDate,
                    Completed = model.Completed,
                    ReminderNotification = model.ReminderNotification,
                    Description = model.Description,
                    RepeatTask = model.RepeatTask,
                    Interval = model.Interval,
                    RepeatAfter = model.RepeatAfter,
                    Untill = model.Untill,
                    UntillDate = model.UntillDate,
                    UntillCompile = model.UntillCompile,
                    RemindUsing = model.RemindUsing,
                    RemindTo = model.RemindTo,


                    RepeatEvery = model.RepeatEvery,
                    RepeatOnWeekDay = model.RepeatOnWeekDay,
                    RepeatOnDay = model.RepeatOnDay,
                    WillRepeat = model.WillRepeat,
                    WillRepeatWeekDay = model.WillRepeatWeekDay,
                    RepeatOnMonth = model.RepeatOnMonth
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
