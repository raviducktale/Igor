using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Repository.IRepository;

namespace TaskManagement.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly DBContext _context = null;

        public EmployeeRepository(IOptions<MongoSetting> settings)
        {
            _context = new DBContext(settings);
        }

        public Task<List<Employee>> GetAllEmployees()
        {
            try
            {
                return  _context.Employee.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async System.Threading.Tasks.Task AddEmployee(Employee Employee)
        {
            try
            {
                await _context.Employee.InsertOneAsync(Employee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public  Task<Employee> GetEmployee(string id)
        {
            try
            {

                FilterDefinition<Employee> filter = Builders<Employee>.Filter.Eq("_id", ObjectId.Parse(id));
                var result = _context.Employee.Find(filter).ToList();

                return _context
                    .Employee
                    .Find(filter)
                    .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
          
        }


        public async Task<bool> RemoveEmployee(string id)
        {
            try
            {
                DeleteResult actionResult = await _context.Employee.DeleteOneAsync(
                Builders<Employee>.Filter.Eq("_id",ObjectId.Parse(id)));
                return actionResult.IsAcknowledged
                && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async System.Threading.Tasks.Task UpdateEmployee(Employee emp)
        {
            try
            {
                await _context.Employee.ReplaceOneAsync(b => b._id == emp._id, emp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
