using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class DefaultSchedule
    {
        [BsonId]
        public bool AllDay { get; set; }
        public List<string> Categorize { get; set; }
        public string CustomStyle { get; set; }
        public string Description { get; set; }
        public DateTime EndTime { get; set; }
        public string EndTimezone { get; set; }
        public int? Id { get; set; }
        public string Location { get; set; }
        public int Owner { get; set; }
        public string Priority { get; set; }
        public int? Recurrence { get; set; }
        public string RecurrenceEndDate { get; set; }
        public virtual RecurrenceRule RecurrenceRule { get; set; }
        public string RecurrenceStartDate { get; set; }
        public string RecurrenceType { get; set; }
        public string RecurrenceTypeCount { get; set; }
        public bool Reminder { get; set; }
        public DateTime StartTime { get; set; }
        public string StartTimeZone { get; set; }
        public string Subject { get; set; }

      

    }
    public class RecurrenceRule
    {
        public string FREQ { get; set; }
        public int INTERVAL { get; set; }
        public int COUNT { get; set; }
    }
}

