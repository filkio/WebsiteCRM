using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Requests
{
    public class UpdateUserIdentifierRequest
    {
        public Guid UserIdentifierId { get; set; }
        public Guid TypeId { get; set; }
        public string Value { get; set; }
    }
}
