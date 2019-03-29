using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class ReminderNotification
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public int ReminderNotificationId { get; set; }
        public string Text { get; set; }
        public DateTime? Date { get; set; }
    }
}
