﻿using System;
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
    public class MeetingController : ControllerBase
    {
        private readonly MeetingRepository _meetingRepository;
        public MeetingController(IOptions<MongoSetting> settings)
        {
            _meetingRepository = new MeetingRepository(settings); ;
        }


        [HttpGet]
        public async Task<IActionResult> GetMeeting()
        {
            IEnumerable<Meeting> model = await _meetingRepository.GetAllMeetings();
            return Ok(model);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeetingById(string id)
        {

            var Meeting = await _meetingRepository.GetMeeting(id);
            if (Meeting == null)
                return new NotFoundResult();
            return new ObjectResult(Meeting);

        }




        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody]Meeting Meeting)
        {
            //ObjectId obj = new ObjectId();
            //Meeting._id = obj;
            await _meetingRepository.AddMeeting(Meeting);
            return new OkObjectResult(Meeting);
        }

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] MeetingVM model)
        {
            try
            {
                Meeting Meeting = new Meeting()
                {
                    _id = ObjectId.Parse(model._id),
                    MeetingId = model.MeetingId,
                    MeetingSubject = model.MeetingSubject,
                    Location = model.Location,
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
                await _meetingRepository.UpdateMeeting(Meeting);
                return new OkObjectResult(Meeting);
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
            await _meetingRepository.RemoveMeeting(id);
            return new ObjectResult(id);
        }

    }
}