using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EmployeeManagementServer.Models
{
    public class Leave
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Reason { get; set; }

        public string Status { get; set; }

        public string StartPeriod { get; set; }

        public string EndPeriod { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}