using Microsoft.Extensions.Options;
using MongoDB.Driver;
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

        public IMongoCollection<Meetings> Meetings
        {
            get
            {
                return _database.GetCollection<Meetings>("Meetings");
            }
        }

        public IMongoCollection<Calls> Calls
        {
            get
            {
                return _database.GetCollection<Calls>("Calls");
            }
        }
        public IMongoCollection<Comments> Comments
        {
            get
            {
                return _database.GetCollection<Comments>("Comments");
            }
        }
        public IMongoCollection<Tasks> Tasks
        {
            get
            {
                return _database.GetCollection<Tasks>("Tasks");
            }
        }
        public IMongoCollection<Scheduler> Scheduler
        {
            get
            {
                return _database.GetCollection<Scheduler>("Scheduler");
            }
        }
        public IMongoCollection<History> History
        {
            get
            {
                return _database.GetCollection<History>("History");
            }
        }

    }
}

