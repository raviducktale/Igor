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
    public class CallController : ControllerBase
    {
        private readonly CallRepository _callRepository;
        public CallController(IOptions<MongoSetting> settings)
        {
            _callRepository = new CallRepository(settings); ;
        }

        [HttpGet]
        public async Task<IActionResult> GetCall()
        {
            IEnumerable<Call> model = await _callRepository.GetAllCall();
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
        public async Task<IActionResult> Add([FromBody]Call Call)
        {
            //ObjectId obj = new ObjectId();
            //Call._id = obj;
            await _callRepository.AddCall(Call);
            return new OkObjectResult(Call);
        }

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] CallVM model)
        {
            try
            {
                Call Call = new Call()
                {
                    _id = ObjectId.Parse(model._id),
                    CallId = model.CallId,
                    CallSubject = model.CallSubject,
                    ResponsiblePerson = model.ResponsiblePerson,
                    Priority = model.Priority,
                    CreatedBy = model.CreatedBy,
                    UpdatedBy = model.UpdatedBy,
                    CreatedDate = model.CreatedDate,
                    UpdatedDate = model.UpdatedDate,
                    EventStartDate = model.EventStartDate,
                    EventEndDate = model.EventEndDate,
                    RepeatTask = model.RepeatTask,
                    ReminderNotification = model.ReminderNotification,
                    Completed = model.Completed,
                    Description = model.Description
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