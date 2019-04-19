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
using System.Net.Http;
using System.Net.Http.Headers;
using System.Json;
using System.Web;
using Newtonsoft.Json;
using RestSharp;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulerController : ControllerBase
    {
        private readonly ISchedulerRepository _schedulerRepository;
        private readonly ICallsRepository _callRepository;
        public SchedulerController(ISchedulerRepository schedulerRepository, ICallsRepository callRepository)
        {
            _schedulerRepository = schedulerRepository;
            _callRepository = callRepository;
        }

        //[HttpGet]
        //[Produces("application/xml")]
        //public async Task<IActionResult> GetScheduler()
        //{
        //    string URL = "https://sub.domain.com/objects.json";
        //    HttpClient client = new HttpClient();

        //    HttpResponseMessage response = await client.GetAsync(
        //          URL);
        //    response.EnsureSuccessStatusCode();
        //    IEnumerable<Scheduler> model = await _schedulerRepository.GetAllScheduler();
        //    return Ok(model);

        //}

        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetSchedulerById(string id)
        //{
        //    var Scheduler = await _schedulerRepository.GetScheduler(id);
        //    if (Scheduler == null)
        //        return new NotFoundResult();
        //    return new ObjectResult(Scheduler);
        //}

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
                    Id = model.Id,
                    //StartTime = model.StartTime,
                    //EndTime = model.EndTime,
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


        //public JsonResult LoadData()
        //{


        //}


        [HttpPost("GetCalls")]
       // [Produces("application/xml")]
        public async Task<JsonResult> GetCallsAsync(string StartDate, string EndDate)
        {
            //IEnumerable<Calls> model = _callRepository.GetAllCalls();
            //List<DefaultSchedule> schedulerModelList = new List<DefaultSchedule>();
            //int Id = 0;

            //foreach (var call in model.ToList())
            //{

            DefaultSchedule schedulerModel = new DefaultSchedule();
            schedulerModel.RecurrenceRule = new RecurrenceRule();
            schedulerModel.AllDay = false;
            schedulerModel.Categorize = new List<string>(new string[] { "1", "2" });
            schedulerModel.CustomStyle = "";
            schedulerModel.Description = "";
            schedulerModel.EndTime = DateTime.Today.AddDays(3);
            schedulerModel.EndTimezone = "";
            schedulerModel.Id = 100;
            schedulerModel.Location = "chn";
            schedulerModel.Owner = 1;
            schedulerModel.Priority = "";
            schedulerModel.Recurrence = null;
            schedulerModel.RecurrenceEndDate = null;
            schedulerModel.RecurrenceRule.FREQ = "DAILY";
            schedulerModel.RecurrenceRule.INTERVAL = 2;
            schedulerModel.RecurrenceRule.COUNT = 1;
            schedulerModel.RecurrenceStartDate = null;
            schedulerModel.RecurrenceType = null;
            schedulerModel.RecurrenceTypeCount = null;
            schedulerModel.Reminder = true;
            schedulerModel.StartTime = DateTime.Today.AddDays(2);
            schedulerModel.StartTimeZone = null;
            schedulerModel.Subject = "Bering Sea Gold";


            //string URL = "https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData";
            //HttpClient client = new HttpClient();
            //HttpResponseMessage response = await client.GetAsync(
            //      URL);
            //response.EnsureSuccessStatusCode();
            //client.DefaultRequestHeaders.Accept.Add(
            //  new MediaTypeWithQualityHeaderValue("application/json"));


            return new JsonResult(schedulerModel);
        }

        [HttpGet("GetSchedulerData")]
        [Produces("application/json")]
        public async Task<IActionResult> GetSchedulerData()
        {
            string URL = "https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData";
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(
                  URL);
            response.EnsureSuccessStatusCode();
            client.DefaultRequestHeaders.Accept.Add(
              new MediaTypeWithQualityHeaderValue("application/json"));
            return Ok(response);
        }
    }
}