using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TaskManagement.Models;

namespace TaskManagement
{
    public class DBContext
    {
        //private IMongoDatabase mongoDatabase;
        //public IMongoDatabase GetMongoDatabase()
        //{
        //    var mongoClient = new MongoClient("mongodb://localhost:27017");
        //    mongoDatabase = mongoClient.GetDatabase("firstdatabase");
        //    return mongoDatabase;
        //}


        private readonly IMongoDatabase _database = null;

        public DBContext(IOptions<MongoSetting> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Employee> Employee
        {
            get
            {
                return _database.GetCollection<Employee>("Employee");
            }
        }
    }
}

