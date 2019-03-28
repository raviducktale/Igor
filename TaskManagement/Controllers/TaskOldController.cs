using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using TaskManagement.Models;
using TaskManagement.Models.ViewModels;
using TaskManagement.Repository;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskOldController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;
        public TaskOldController(IOptions<MongoSetting> settings)
        {
            _employeeRepository = new EmployeeRepository(settings); ;
        }
        //[HttpGet]
        //public async Task<IActionResult> GetTask()
        //{
        //    IEnumerable<Employee> model = await _employeeRepository.GetAllEmployees();
        //    return Ok(model);
        //}


        //[HttpGet("{id}", Name = "Get")]
        //public async Task<IActionResult> GetById(string id)
        //{

        //    var Employee = await _employeeRepository.GetEmployee(id);
        //    if (Employee == null)
        //        return new NotFoundResult();
        //    return new ObjectResult(Employee);
          
        //}




        //[HttpPost("Add")]
        //public async Task<IActionResult> Add([FromBody]Employee emp)
        //{
        //    ObjectId obj = new ObjectId();
        //    emp._id = obj;
        //    await _employeeRepository.AddEmployee(emp);
        //    return new OkObjectResult(emp);
        //}

        //// PUT: api/Task/5
        //[HttpPut("Update")]
        //public async Task<IActionResult> Update([FromBody] EmployeeVM model)
        //{
        //    try
        //    {
        //        Employee emp = new Employee()
        //        {
        //            _id = ObjectId.Parse(model._id),
        //            age = model.age,
        //            name = model.name
        //        };


        //        await _employeeRepository.UpdateEmployee(emp);
        //        return new OkObjectResult(emp);
        //    }
        //    catch(Exception ex)
        //    {

        //    }
        //    return Ok();
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete]
        //[Route("Delete/{id}")]
        //public async Task<IActionResult> Delete(string id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    await _employeeRepository.RemoveEmployee(id);
        //    return new ObjectResult(id);
        //}
    }

   
}
