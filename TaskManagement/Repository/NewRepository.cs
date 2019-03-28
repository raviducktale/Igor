using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Interface;
using TaskManagement.Models;

namespace TaskManagement.Repository
{
    public class NewRepository
    {

        //MongoClient _client;
        //IMongoDatabase _db;

        //public NewRepository()
        //{
        //    _client = new MongoClient("mongodb://localhost:27017");
        //    _db = _client.GetDatabase("EmployeeDB");
        //}

        //public IEnumerable<NewEmployee> GetProducts()
        //{
        //    return _db.GetCollection<NewEmployee>("NewEmployee").FindAll();
        //}


        //public NewEmployee GetProduct(ObjectId id)
        //{
        //    var res = Query<NewEmployee>.EQ(p => p.Id, id);
        //    return _db.GetCollection<NewEmployee>("Products").FindOne(res);
        //}

        //public NewEmployee Create(NewEmployee p)
        //{
        //    _db.GetCollection<NewEmployee>("NewEmployee").Save(p);
        //    return p;
        //}

        //public void Update(ObjectId id, NewEmployee p)
        //{
        //    p.Id = id;
        //    var res = Query<NewEmployee>.EQ(pd => pd.Id, id);
        //    var operation = Update<NewEmployee>.Replace(p);
        //    _db.GetCollection<NewEmployee>("Products").Update(res, operation);
        //}
        //public void Remove(ObjectId id)
        //{
        //    var res = Query<NewEmployee>.EQ(e => e.Id, id);
        //    var operation = _db.GetCollection<NewEmployee>("Products").Remove(res);
        //}


    }
}
