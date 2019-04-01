using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models.ViewModels
{
    public class SchedulerVM
    {
       
        public string _id { get; set; }
        public string Subject { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string startTimezone { get; set; }
        public string endTimezone { get; set; }
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
