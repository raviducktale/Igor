using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;
using TaskManagement.Repository.IRepository;
using System.Json;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulerController : ControllerBase
    {
        private readonly ISchedulerRepository _schedulerRepository;
        public SchedulerController(ISchedulerRepository schedulerRepository)
        {
            _schedulerRepository = schedulerRepository;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetScheduler()
        //{
        //    IEnumerable<Scheduler> model = await _schedulerRepository.GetAllScheduler();
        //    return Ok(model);
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchedulerById(string id)
        {
            var Scheduler = await _schedulerRepository.GetScheduler(id);
            if (Scheduler == null)
                return new NotFoundResult();
            return new ObjectResult(Scheduler);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody]SchedulerVM Scheduler)
        {
            return Ok(await _schedulerRepository.AddScheduler(Scheduler));
        }

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] SchedulerVM model)
        {
            try
            {
                Scheduler Scheduler = new Scheduler()
                {
                    _id = ObjectId.Parse(model._id),
                    Subject = model.Subject,
                    Id=model.Id,
                    StartTime = model.StartTime,
                    EndTime = model.EndTime,
                    StartTimezone = model.StartTimezone,
                    EndTimezone = model.EndTimezone,
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
                await _schedulerRepository.UpdateScheduler(Scheduler);
                return new OkObjectResult(Scheduler);
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
            await _schedulerRepository.RemoveScheduler(id);
            return new ObjectResult(id);
        }

        [HttpGet]
        public JsonResult GetData()
        {
            var  model =  _schedulerRepository.getList();
            var list = model.Result.ToList();
            return new JsonResult(list);
        }
    }
  
}