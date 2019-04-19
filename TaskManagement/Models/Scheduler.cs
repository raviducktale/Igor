using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class Scheduler
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public string Subject { get; set; }
        public int? Id { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string StartTimezone { get; set; }
        public string EndTimezone { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public bool IsAllDay { get; set; }
        public int? RecurrenceID { get; set; }
        public string RecurrenceRule { get; set; }
        public string Frequency { get; set; }
        public string Interval { get; set; }
        public int? Count { get; set; }
        public bool IsReadonly { get; set; }
        public bool IsBlock { get; set; }

        public DateTime? Untill { get; set; }
        public string ByDay { get; set; }
        public string BYMonthDay { get; set; }
        public string BYMonth { get; set; }
        public string BYSetPOS { get; set; }



    }
}
