using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class NewEmployee
    {
            public ObjectId Id { get; set; }

            [BsonElement("Age")]
            public int age { get; set; }

            [BsonElement("Name")]
            public string name { get; set; }

      
    }
}
