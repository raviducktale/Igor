﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class Meetings
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public int MeetingId { get; set; }
        public string MeetingSubject { get; set; }
        public string Location { get; set; }
        public int ResponsiblePerson { get; set; }
        public int Priority { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime EventStartDate { get; set; }
        public DateTime EventEndDate { get; set; }
        public int RepeatTask { get; set; }
        public int ReminderNotification { get; set; }
        public bool Completed { get; set; }
        public string Description { get; set; }

    }


}