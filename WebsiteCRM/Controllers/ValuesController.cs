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
                updateUser.Age = updateRequest.Age;
                updateUser.ChildrenQuantity = updateRequest.ChildrenQuantity;
                updateUser.DateOfBirth = updateRequest.DateOfBirth;
                updateUser.FirstName = updateRequest.FirstName;
                updateUser.MiddleName = updateRequest.MiddleName;
                updateUser.LastName = updateRequest.LastName;
                updateUser.UserTypeEntity = db.UserTypes.Where(ut => ut.Id == updateRequest.TypeId).FirstOrDefault();
                updateUser.SourceEntity = db.Sources.Where(s => s.Id == updateRequest.SourceId).FirstOrDefault();
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

    }
}
