using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using TaskManagement.Models;

namespace TaskManagement  
{
    public class DBContext
    {
        private readonly IMongoDatabase _database = null;
        public DBContext(IOptions<MongoSetting> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
               
            //MongoServer server = client.GetServer();
            _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Employee> Employee
        {
            get
            {
                return _database.GetCollection<Employee>("Employee");
            }
        }

        public IMongoCollection<Meeting> Meeting
        {
            get
            {
                return _database.GetCollection<Meeting>("Meeting");
            }
        }

        public IMongoCollection<Call> Call
        {
            get
            {
                return _database.GetCollection<Call>("Call");
            }
        }
    }
}

