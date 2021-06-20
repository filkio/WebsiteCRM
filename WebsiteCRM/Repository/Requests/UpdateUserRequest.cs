using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Requests
{
    public class UpdateUserRequest
    {
        public Guid UserId { get; set; }
        public int ChildrenQuantity { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string UserType { get; set; }
        public string Source { get; set; }
    }
}
