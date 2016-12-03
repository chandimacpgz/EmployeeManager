using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using EmployeeManagementServer.Models;
using System.Collections.Specialized;
using System.Text;
using System.IO;
using System.Web.Script.Serialization;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using System.Configuration;

namespace EmployeeManagementServer.Controllers
{
    public class UsersController : ApiController
    {
        private EmployeeManagementServerContext db = new EmployeeManagementServerContext();

        [Authorize(Roles = "Admin , Manager, Viewer")]
        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        [Authorize(Roles = "Admin , Manager, Viewer")]
        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            User user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize(Roles = "Admin , Manager, Viewer")]
        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUser(string id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize(Roles = "Admin , Manager, Viewer")]
        // POST: api/Users
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        [Authorize(Roles = "Admin , Manager")]
        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            User user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/users/role")]
        // POST: api/Users
        [ResponseType(typeof(User))]
        public void UpdateRole(UserRole userRole)
        {
            string id = userRole.Id;
            string role = userRole.Role;

            string name = "wreghfcnfmhjkjmhngbfv";
            string password = "null";
            string clientId = "099153c2625149bc8ecb3e85e03f0022";

            string postData = "username=" + name;
            postData += ("&password=" + password);
            postData += ("&grant_type=password&client_id=" + clientId);

            string AccessToken;

            WebRequest webRequest = WebRequest.Create("http://empauth.azurewebsites.net/oauth2/token");
            webRequest.ContentType = "application/x-www-form-urlencoded";
            webRequest.Method = "POST";
            byte[] bytes = Encoding.ASCII.GetBytes(postData);
            webRequest.ContentLength = bytes.Length;
            using (Stream outputStream = webRequest.GetRequestStream())
            {
                outputStream.Write(bytes, 0, bytes.Length);
            }
            using (WebResponse webResponse = webRequest.GetResponse())
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(AdmAccessToken));
                //Get deserialized object from JSON stream
                AdmAccessToken token = (AdmAccessToken)serializer.ReadObject(webResponse.GetResponseStream());
                AccessToken = token.access_token;
            }

            WebClient myWebClient = new WebClient();
            myWebClient.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
            myWebClient.Headers.Add("Authorization", "Bearer " + AccessToken);

            byte[] byteArray = Encoding.ASCII.GetBytes("Id=" + id + "&Role=" + role);
            byte[] responseArray = myWebClient.UploadData("http://empauth.azurewebsites.net/api/users/update", "POST", byteArray);
        }

        [Authorize(Roles = "Viewer,Admin")]
        [HttpPost]
        [Route("api/users/newViewer")]
        // POST: api/Users
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> UpdatenewViewer(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(string id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }

    public class AdmAccessToken
    {
        [DataMember]
        public string access_token { get; set; }
        [DataMember]
        public string token_type { get; set; }
        [DataMember]
        public string expires_in { get; set; }

    }
}