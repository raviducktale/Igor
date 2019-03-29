using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class RepeatTask
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public int RepeatTaskId { get; set; }
        public int Day { get; set; }
        public int week { get; set; }
        public int month { get; set; }
        public int year { get; set; }
    }
}
