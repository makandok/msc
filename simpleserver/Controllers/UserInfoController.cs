using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SimpleServer.Models;

namespace SimpleServer.Controllers
{
    public class UserInfoController : ApiController
    {
        private UserRoadInfo[] allinfo = new UserRoadInfo[]
        {
            new UserRoadInfo {Id = 1, comments = "Hello 1"},
            new UserRoadInfo {Id = 2, comments = "Hello 2"},
            new UserRoadInfo {Id = 3, comments = "Hello 3"},
            new UserRoadInfo {Id = 4, comments = "Hello 4"},
            new UserRoadInfo {Id = 5, comments = "Hello 5"}
        };

        public IEnumerable<UserRoadInfo> getallinfo()
        {
            return allinfo;
        }

        public IHttpActionResult getinfo(int id)
        {
            var c = allinfo.FirstOrDefault(t => t.Id == id);
            return c == null ? NotFound() : (IHttpActionResult) Ok(c);
        }
    }
}
