using FilkioCrm.Data.Sql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteCRM.Repository.Responces
{
    public class UserIdentifiersResponce
    {
        [JsonPropertyName("ID")]
        public Guid Id { get; set; }
        [JsonPropertyName("Тип")]
        public string Type { get; set; }
        [JsonPropertyName("Значение")]
        public string Value { get; set; }
        public UserIdentifiersResponce(UserIdentifierEntity userIdentifierEntity)
        {
            Id = userIdentifierEntity.Id;
            Type = userIdentifierEntity.UserIdentifierTypeEntity.Name;
            Value = userIdentifierEntity.Value;
        }
    }
}
