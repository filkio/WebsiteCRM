using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilkioCrm.DI;
using FilkioCrm.Data.Sql;
using WebsiteCRM.Repository.Responces;
using WebsiteCRM.Repository.Requests;
using MoreLinq;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebsiteCRM.Controllers
{
    [Route("api")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        //GET методы
        [HttpGet("getusers")]
        public IEnumerable<UsersResponce> GetUsers()
        {
            var db = new FilkioCrmContext();
            var list = new List<UsersResponce>();
            var dbUsers =  db.Users.Include(source => source.SourceEntity).Include(type => type.UserTypeEntity);
            foreach (var item in dbUsers)
            {
                list.Add(new UsersResponce(item));
            }
            return list;
        }
        [HttpGet("getuser/{userGuid}")]
        public UsersResponce GetUser(Guid userGuid)
        {
            var db = new FilkioCrmContext();
            var dbUser = db.Users.Where(u => u.Id == userGuid).Include(source => source.SourceEntity).Include(type => type.UserTypeEntity).FirstOrDefault();
            return new UsersResponce(dbUser);
        }
        [HttpGet("getsources")]
        public IEnumerable<SourcesResponce> GetSources()
        {
            var db = new FilkioCrmContext();
            var list = new List<SourcesResponce>();
            var dbSources = db.Sources;
            foreach (var item in dbSources)
            {
                list.Add(new SourcesResponce(item));
            }
            return list;
        }
        [HttpGet("getsegments")]
        public IEnumerable<SegmentsResponce> GetSegments()
        {
            var db = new FilkioCrmContext();
            var list = new List<SegmentsResponce>();
            var dbSegments= db.Segments;
            foreach (var item in dbSegments)
            {
                list.Add(new SegmentsResponce(item));
            }
            return list;
        }
        [HttpGet("getuseridentifiers/{userGuid}")]
        public IEnumerable<UserIdentifiersResponce> GetUserIdentifiers(Guid userGuid)
        {
            var db = new FilkioCrmContext();
            var list = new List<UserIdentifiersResponce>();
            var dbUserIdentifiers = db.UserIdentifiers.Where(ui => ui.UserEntity.Id == userGuid).Include(ui => ui.UserIdentifierTypeEntity).ToList();
            foreach (var item in dbUserIdentifiers)
            {
                list.Add(new UserIdentifiersResponce(item));
            }
            return list;

        }
        [HttpGet("getsourcenames")]
        public IEnumerable<string> GetSourceNames()
        {
            var db = new FilkioCrmContext();
            var list = db.Sources;
            List<string> names = new List<string>();
            foreach (var item in list)
            {
                names.Add(item.Name);
            }
            return names;
        }
        [HttpGet("getusertypenames")]
        public IEnumerable<string> GetUserTypeNames()
        {
            var db = new FilkioCrmContext();
            var list = db.UserTypes;
            List<string> names = new List<string>();
            foreach (var item in list)
            {
                names.Add(item.Type);
            }
            return names;
        }
        //DELETE методы
        [HttpDelete("removeuser/{guid}")]
        public void RemoveUser(Guid guid)
        {
            var db = new FilkioCrmContext();
            UserEntity deleteUser = db.Users.Where(u => u.Id == guid).FirstOrDefault();
            FullRemoveUserFromDb(db, deleteUser);
        }
        [HttpDelete("removesource/{guid}")]
        public void RemoveSource(Guid guid)
        {
            var db = new FilkioCrmContext();
            SourceEntity deleteSource = db.Sources.Where(s => s.Id == guid).Include(s => s.UserEntities).FirstOrDefault();
            FullRemoveSourceFromDb(db, deleteSource);
        }
        [HttpDelete("removesegment/{guid}")]
        public void RemoveSegment(Guid guid)
        {
            var db = new FilkioCrmContext();
            SegmentEntity deleteSegment = db.Segments.Where(s => s.Id == guid).Include(s => s.UserEntities).FirstOrDefault();
            FullRemoveSegmentFromDb(db, deleteSegment);
        }
        [HttpDelete("removeuseridentifier/{guid}")]
        public void RemoveUserIdentifier(Guid guid)
        {
            var db = new FilkioCrmContext();
            UserIdentifierEntity deleteIdentifier = db.UserIdentifiers.Where(ui => ui.Id == guid).FirstOrDefault();
            db.UserIdentifiers.Remove(deleteIdentifier);
            db.SaveChanges();
        }

        private void FullRemoveUserFromDb(FilkioCrmContext db, UserEntity deleteUser)
        {
            if (deleteUser != null)
            {
                //Удаление всех идентификаторов пользователя
                var deleteIndetifiers = db.UserIdentifiers.Where(i => i.UserEntity.Id == deleteUser.Id).ToList();
                db.UserIdentifiers.RemoveRange(deleteIndetifiers);
                //Выгон пользователя из всех сегментов
                deleteUser.SegmentEntities = null;
                //Удаление юзера
                db.Users.Remove(deleteUser);
                db.SaveChanges();
            }
        }
        private void FullRemoveSourceFromDb(FilkioCrmContext db, SourceEntity deleteSource)
        {
            if (deleteSource != null)
            {
                //Выгон всех пользователей из сорса 
                deleteSource.UserEntities = null;
                //Удаление сорса
                db.Sources.Remove(deleteSource);
                db.SaveChanges();
            }
        }
        private void FullRemoveSegmentFromDb(FilkioCrmContext db, SegmentEntity deleteSegment)
        {
            if (deleteSegment != null)
            {
                //Выгон всех пользователей из сегмента
                deleteSegment.UserEntities = null;
                //Удаление сегмента
                db.Segments.Remove(deleteSegment);
                db.SaveChanges();
            }
        }
        //POST методы
        [HttpPost("updateuser")]
        public void UpdateUser(UpdateUserRequest updateRequest)
        {
            var db = new FilkioCrmContext();
            var updateUser = db.Users.Where(u => u.Id == updateRequest.UserId).FirstOrDefault();
            if (updateUser != null)
            {

                updateUser.ChildrenQuantity = updateRequest.ChildrenQuantity;
                updateUser.DateOfBirth = updateRequest.DateOfBirth;
                updateUser.Age = DateTime.Now.Year - updateUser.DateOfBirth.Year;
                updateUser.FirstName = updateRequest.FirstName;
                updateUser.MiddleName = updateRequest.MiddleName;
                updateUser.LastName = updateRequest.LastName;
                updateUser.UserTypeEntity = db.UserTypes.Where(ut => ut.Type == updateRequest.UserType).FirstOrDefault();
                updateUser.SourceEntity = db.Sources.Where(s => s.Name == updateRequest.Source).FirstOrDefault();
                db.SaveChanges();
            }
        }
        [HttpPost("updatesource")]
        public void UpdateSource(UpdateSourceRequest updateRequest)
        {
            var db = new FilkioCrmContext();
            var updateSource = db.Sources.Where(s => s.Id == updateRequest.SourceId).FirstOrDefault();
            if (updateSource != null)
            {
                updateSource.Name = updateRequest.Name;
                updateSource.SecretKey = updateRequest.SecretKey;
                db.SaveChanges();
            }
        }
        [HttpPost("updatesegment")]
        public void UpdateSegment(UpdateSegmentRequest updateRequest)
        {
            var db = new FilkioCrmContext();
            var updateSegment = db.Segments.Where(s => s.Id == updateRequest.SegmentId).FirstOrDefault();
            if (updateSegment != null)
            {
                updateSegment.Name = updateRequest.Name;
                updateSegment.SqlExpression = updateRequest.SqlExpression;
                updateSegment.IsActive = updateRequest.IsActive;
                updateSegment.Cron = updateRequest.Cron;
                db.SaveChanges();
            }
        }
        [HttpPost("updatMy Requesteuseridentifier")]
        public void UpdateUserIdentifier(UpdateUserIdentifierRequest updateRequest)
        {
            var db = new FilkioCrmContext();
            var updateUserIdentifier = db.UserIdentifiers.Where(ui => ui.Id == updateRequest.UserIdentifierId).FirstOrDefault();
            if (updateUserIdentifier != null)
            {
                updateUserIdentifier.Value = updateRequest.Value;
                updateUserIdentifier.UserIdentifierTypeEntity = db.UserIdentifierTypes.Where(uit => uit.Id == updateRequest.TypeId).FirstOrDefault();
                db.SaveChanges();
            }
        }
        //PUT методы
        [HttpPut("createuser")]
        public void CreateUser(CreateUserRequest createRequest)
        {
            var db = new FilkioCrmContext();
            var user = new UserEntity();
            user.Id = Guid.NewGuid();
            user.FirstName = createRequest.FirstName;
            user.MiddleName = createRequest.MiddleName;
            user.LastName = createRequest.LastName;
            user.DateOfBirth = createRequest.DateOfBirth;
            user.ChildrenQuantity = createRequest.ChildrenQuantity;
            user.Age = DateTime.Now.Year - createRequest.DateOfBirth.Year;
            user.UserTypeEntity = db.UserTypes.Where(ut => ut.Id == createRequest.TypeId).FirstOrDefault();
            user.SourceEntity = db.Sources.Where(s => s.Id == createRequest.SourceId).FirstOrDefault();
            db.Users.Add(user);
            db.SaveChanges();
        }
        [HttpPut("createsource")]
        public void CreateSource(CreateSourceRequest createRequest)
        {
            var db = new FilkioCrmContext();
            var source = new SourceEntity();
            source.Id = Guid.NewGuid();
            source.Name = createRequest.Name;
            source.SecretKey = createRequest.SecretKey;
            db.Sources.Add(source);
            db.SaveChanges();
        }
        [HttpPut("createsegment")]
        public void CreateSegment(CreateSegmentRequest createRequest)
        {
            var db = new FilkioCrmContext();
            var segment = new SegmentEntity();
            segment.Id = Guid.NewGuid();
            segment.Name = createRequest.Name;
            segment.SqlExpression = createRequest.SqlExpression;
            segment.IsActive = createRequest.IsActive;
            segment.Cron = createRequest.Cron;
            db.Segments.Add(segment);
            db.SaveChanges();
        }
        [HttpPut("createuseridentifier")]
        public void CreateUserIdentifier(CreateUserIdentifierRequest createRequest)
        {
            var db = new FilkioCrmContext();
            var userIdentifier = new UserIdentifierEntity();
            userIdentifier.Id = Guid.NewGuid();
            userIdentifier.Value = createRequest.Value;
            userIdentifier.UserEntity = db.Users.Where(u => u.Id == createRequest.UserId).FirstOrDefault();
            userIdentifier.UserIdentifierTypeEntity = db.UserIdentifierTypes.Where(uit => uit.Id == createRequest.TypeId).FirstOrDefault();
            db.UserIdentifiers.Add(userIdentifier);
            db.SaveChanges();
        }


    }
}
