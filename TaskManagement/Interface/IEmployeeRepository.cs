using TaskManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace TaskManagement.Interface
{
   public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetEmployee(string id);
        Task AddEmployee(Employee item);
        Task<bool> RemoveEmployee(string id);
        Task UpdateEmployee(Employee item);
    }
}
