using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class History
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public string Action { get; set; }
        public string Subject { get; set; }
        public string Panel { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Button { get; set; }
        public string ActionId { get; set; }
        public bool Completed { get; set; }
    }
}
