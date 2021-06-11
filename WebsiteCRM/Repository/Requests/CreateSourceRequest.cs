using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Requests
{
    public class CreateSourceRequest
    {
        public string Name { get; set; }
        public string SecretKey { get; set; }
    }
}
