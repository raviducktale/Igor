using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using MongoDB.Bson;

namespace TaskManagement.Models.ViewModels
{
    
    public class EmployeeVM
    {
        public string _id { get; set; }
        public int age { get; set; }
        public string name { get; set; }
    }
}
