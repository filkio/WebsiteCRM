using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Requests
{
    public class UpdateSegmentRequest
    {
        public Guid SegmentId { get; set; }
        public string Name { get; set; }
        public string Cron { get; set; }
        public bool IsActive { get; set; }
        public string SqlExpression { get; set; }
    }
}
