using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EmployeeManagementServer.Models
{
    public class EmployeeManagementServerContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public EmployeeManagementServerContext() : base("name=EmployeeManagementServerContext")
        {
        }

        public System.Data.Entity.DbSet<EmployeeManagementServer.Models.Department> Departments { get; set; }

        public System.Data.Entity.DbSet<EmployeeManagementServer.Models.User> Users { get; set; }

        public System.Data.Entity.DbSet<EmployeeManagementServer.Models.Leave> Leaves { get; set; }
    }
}
