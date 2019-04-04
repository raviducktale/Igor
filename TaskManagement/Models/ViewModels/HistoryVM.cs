using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class HistoryVM
    {
        public string _id { get; set; }
        public string Action { get; set; }
        public string Panel { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Button { get; set; }
    }
}
