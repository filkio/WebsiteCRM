using FilkioCrm.Data.Sql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Responces
{
    public class SourcesResponce
    {
        [JsonPropertyName("ID")]
        public Guid Id { get; set; }
        [JsonPropertyName("Ключ")]
        public string SecretKey { get; set; }
        [JsonPropertyName("Название")]
        public string Name { get; set; }

        public SourcesResponce(SourceEntity sourceEntity)
        {
            Id = sourceEntity.Id;
            Name = sourceEntity.Name;
            SecretKey = sourceEntity.SecretKey;
        }
    }
}
