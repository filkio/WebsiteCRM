using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Requests
{
    public class CreateUserRequest
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int ChildrenQuantity { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Guid TypeId { get; set; }
        public Guid SourceId { get; set; }
    }
}
