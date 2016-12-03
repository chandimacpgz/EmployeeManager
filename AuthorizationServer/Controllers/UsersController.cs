using AuthorizationServer.Entities;
using AuthorizationServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using AuthorizationServer.Logic;


namespace AuthorizationServer.Controllers
{
    // UNDONE: Authorization not implemented
    // UNDONE: Read about naming controllers in Web API. 
    // UNDONE: REST API url convension


    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        // NOTE: Use short name for data types when available. Ex: Boolean: bool, String: string
        [Route("register")]
        [HttpPost]
        public bool Register(User user)
        {
            user.Password = Hash.Generate(user.Password, null , null);
            return new AuthenticateDatabaseConncetion().Register(user);
        }

        // UNDONE: missing .NET naming conventions
        [Authorize(Roles = "ChangeRoleAdmin")]
        [Route("update")]
        public bool Update(User user)
        {
            return new AuthenticateDatabaseConncetion().Update(user);
        }

    }
}