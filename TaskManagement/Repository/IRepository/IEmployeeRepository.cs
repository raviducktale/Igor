using TaskManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace TaskManagement.Repository.IRepository
{
   public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetEmployee(string id);
        System.Threading.Tasks.Task AddEmployee(Employee item);
        Task<bool> RemoveEmployee(string id);
        System.Threading.Tasks.Task UpdateEmployee(Employee item);
    }
}
