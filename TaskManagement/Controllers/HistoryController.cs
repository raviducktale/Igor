using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using TaskManagement.Models;
using TaskManagement.Repository.IRepository;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryRepository _historyRepository;
        public HistoryController(IHistoryRepository historyRepository)
        {
            _historyRepository = historyRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetHistory()
        {
            IEnumerable<History> model = await _historyRepository.GetAllHistory();
            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHistoryById(string id)
        {
            var History = await _historyRepository.GetHistory(id);
            if (History == null)
                return new NotFoundResult();
            return new ObjectResult(History);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody]HistoryVM History)
        {

            return Ok(await _historyRepository.AddHistory(History));
        }

      

        // PUT: api/Task/5
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] HistoryVM model)
        {
            try
            {
                History History = new History()
                {
                    _id = ObjectId.Parse(model._id),

                   Action=model.Action,
                   Panel=model.Panel,
                   CreatedBy=model.CreatedBy,
                   CreatedDate=model.CreatedDate,
                   Button=model.Button
                };
                await _historyRepository.UpdateHistory(History);
                return new OkObjectResult(History);
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
            await _historyRepository.RemoveHistory(id);
            return new ObjectResult(id);
        }

    }
}