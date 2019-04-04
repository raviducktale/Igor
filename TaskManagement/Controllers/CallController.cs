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
    public class CallController : ControllerBase
    {
        private readonly ICallsRepository _callRepository;
        public CallController(ICallsRepository callRepository)
        {
            _callRepository = callRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCall()
        {
            IEnumerable<Calls> model = await _callRepository.GetAllCall();
            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCallById(string id)
        {
            var Call = await _callRepository.GetCall(id);
            if (Call == null)
                return new NotFoundResult();
            return new ObjectResult(Call);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody]CallsVM Call)
        {
           
            return  Ok(await _callRepository.AddCall(Call));
        }

        [HttpPost("priority")]
        public async Task<IActionResult> priority([FromBody]CallsVM Call)
        {
            return Ok(await _callRepository.AddCall(Call));
        }

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] CallsVM model)
        {
            try
            {
                Calls Call = new Calls()
                {
                    _id = ObjectId.Parse(model._id),
                    Subject = model.Subject,
                    ResponsiblePerson = model.ResponsiblePerson,
                    Priority = model.Priority,
                    Types = model.Types,
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
                await _callRepository.UpdateCall(Call);
                return new OkObjectResult(Call);
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
            await _callRepository.RemoveCall(id);
            return new ObjectResult(id);
        }

    }
}