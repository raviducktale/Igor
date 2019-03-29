using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models.ViewModels
{
    public class CallVM
    {
       
        public string _id { get; set; }
        public int CallId { get; set; }
        public string CallSubject { get; set; }
        public int ResponsiblePerson { get; set; }
        public int Priority { get; set; }
        public int Type { get; set; }
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
