using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models.ViewModels
{
    public class TaskVM
    {
       
        public string _id { get; set; }
        public int TaskId { get; set; }
        public string TaskText { get; set; }
        public int ResponsiblePerson { get; set; }
        public int Priority { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? EventStartDate { get; set; }
        public DateTime? EventEndDate { get; set; }
        public Boolean Completed { get; set; }
        public int RepeatTaskId { get; set; }
        public int ReminderNotificationId { get; set; }
    }
}
