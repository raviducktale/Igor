using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models.ViewModels
{
    public class CallsVM
    {
       
        public string _id { get; set; }
        public string Subject { get; set; }
        public string[] ResponsiblePerson { get; set; }
        public int? Priority { get; set; }
        public int? Types { get; set; }
        //public int? CreatedBy { get; set; }
        //public int? UpdatedBy { get; set; }
        //public DateTime? CreatedDate { get; set; }
        //public DateTime? UpdatedDate { get; set; }
        public DateTime? EventStartDate { get; set; }
        public DateTime? EventEndDate { get; set; }
        public int? ReminderNotification { get; set; }
        public string RepeatTask { get; set; }
        public bool Completed { get; set; }
        public string Description { get; set; }
        public int? Interval { get; set; }
        public DateTime? RepeatAfter { get; set; }
        public int? Untill { get; set; }
        public DateTime? UntillDate { get; set; }
        public int? UntillCompile { get; set; }
        public DateTime? RemindUsing { get; set; }
        public string[] RemindTo { get; set; }
        public int? RepeatEvery { get; set; }
        public string RepeatOnWeekDay { get; set; }
        public int? RepeatOnDay { get; set; }
        public int? WillRepeat { get; set; }
        public int? WillRepeatWeekDay { get; set; }
        public int? RepeatOnMonth { get; set; }
        public bool IsAllDay { get; set; }
        public string StartTimeZone { get; set; }
        public string EndTimeZone { get; set; }
        public bool ShowReminder { get; set; }
        public DateTime? ReminderDate { get; set; }
        public string[] ReminderPerson { get; set; }
    }
}
