using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Requests
{
    public class CreateUserIdentifierRequest
    {
        public Guid UserId { get; set; }
        public Guid TypeId { get; set; }
        public string Value { get; set; }
    }
}
