using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilkioCrm.DI;
using FilkioCrm.Data.Sql;
using WebsiteCRM.Repository.Responces;
using MoreLinq;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebsiteCRM.Controllers
{
    [Route("api")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        [HttpGet("getusers")]
        public IEnumerable<UsersResponce> GetUsers()
        {
            var db = new FilkioCrmContext();
            var list = new List<UsersResponce>();
            var dbUsers =  db.Users.Include(source => source.SourceEntity).Include(type => type.UserTypeEntity);
            foreach (var item in dbUsers)
            {
                list.Add(new UsersResponce(item));
            }
            return list;
        }
        [HttpGet("getsources")]
        public IEnumerable<SourcesResponce> GetSources()
        {
            var db = new FilkioCrmContext();
            var list = new List<SourcesResponce>();
            var dbSources = db.Sources;
            foreach (var item in dbSources)
            {
                list.Add(new SourcesResponce(item));
            }
            return list;
        }
        [HttpGet("getsegments")]
        public IEnumerable<SegmentsResponce> GetSegments()
        {
            var db = new FilkioCrmContext();
            var list = new List<SegmentsResponce>();
            var dbSegments= db.Segments;
            foreach (var item in dbSegments)
            {
                list.Add(new SegmentsResponce(item));
            }
            return list;
        }
    }
}
