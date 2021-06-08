using FilkioCrm.Data.Sql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Responces
{
    public class SegmentsResponce
    {
        [JsonPropertyName("ID")]
        public Guid Id { get; set; }
        [JsonPropertyName("Активность")]
        public bool IsActive { get; set; }
        [JsonPropertyName("Название")]
        public string Name { get; set; }
        [JsonPropertyName("Крон-выражение")]
        public string Cron { get; set; }
        [JsonPropertyName("SQL запрос")]
        public string SqlExpression { get; set; }


        public SegmentsResponce(SegmentEntity segmentEntity)
        {
            Id = segmentEntity.Id;
            Cron = segmentEntity.Cron;
            IsActive = segmentEntity.IsActive;
            Name = segmentEntity.Name;
            SqlExpression = segmentEntity.SqlExpression;
        }
    }
}
