using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models
{
    public class Leads
    {
        public string _id { get; set; }
        public string Name { get; set; }
        public DateTime? Date { get; set; }
        public int ResponsiblePerson { get; set; }
    }
}
