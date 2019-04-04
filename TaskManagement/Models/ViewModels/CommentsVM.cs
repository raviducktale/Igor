using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Models.ViewModels
{
    public class CommentsVM
    {
       
        public string _id { get; set; }
        public string Subject  { get; set; }
        public string[] ResponsiblePerson { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
