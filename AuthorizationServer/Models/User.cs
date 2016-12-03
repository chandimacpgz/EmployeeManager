using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AuthorizationServer.Models
{
    // NOTE: Model postfix is not required
    // NOTE: User prefix for properties not required
    public class User
    {
        public string Id { get; set; } 
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}