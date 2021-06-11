using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using FilkioCrm.Data.Sql;

namespace WebsiteCRM.Repository.Responces
{
    public class UsersResponce
    {
        [JsonPropertyName("ID")]
        public Guid Id { get; set; }
        [JsonPropertyName("Источник")]
        public Guid SourceId { get; set; }
        [JsonPropertyName("Тип")]
        public string Type { get; set; }
        [JsonPropertyName("Фамилия")]
        public string FirstName { get; set; }
        [JsonPropertyName("Имя")]
        public string LastName { get; set; }
        [JsonPropertyName("Отчество")]
        public string MiddleName { get; set; }
        [JsonPropertyName("Возраст")]
        public int Age { get; set; }
        [JsonPropertyName("Количество детей")]
        public int ChildrenQuantity { get; set; }
        [JsonPropertyName("Дата рождения")]
        public DateTime DateOfBirth { get; set; }
        public UsersResponce(UserEntity userEntity)
        {
            Id = userEntity.Id;
            Age = userEntity.Age;
            ChildrenQuantity = userEntity.ChildrenQuantity;
            DateOfBirth = userEntity.DateOfBirth;
            FirstName = userEntity.FirstName;
            LastName = userEntity.LastName;
            MiddleName = userEntity.MiddleName;
            if(userEntity.SourceEntity != null)
            SourceId = userEntity.SourceEntity.Id;
            Type = userEntity.UserTypeEntity.Type;
        }
    }
}
