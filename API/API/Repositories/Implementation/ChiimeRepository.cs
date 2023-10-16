using API.Data;
using API.Models.DTOs;
using API.Models.Entities;
using API.Repositories.Interface;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.Json.Serialization.Metadata;

namespace API.Repositories.Implementation
{
    public class ChiimeRepository : IChiimeRepository
    {
        private readonly Context _context;
        private readonly UserManager<User> _userManager;

        public ChiimeRepository(Context context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<Chiime?> CreateChiime(Chiime chiime) 
        {
            chiime.EditedDate = DateTime.Now;
            chiime.CreatedDate = DateTime.Now;
            await _context.AddAsync(chiime);
            await _context.SaveChangesAsync();
            return chiime;
        }

        public async Task<Comment?> CreateComment(Comment comment)
        {
            comment.CreatedDate = DateTime.Now;
            comment.UpdatedDate = DateTime.Now;
            await _context.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }



        public async Task<Chiime?> DeleteChiime(Guid id)
        {
            
            var chiimeToDelete = await _context.Chiimes.FirstOrDefaultAsync(c => c.Id == id);
            
            if (chiimeToDelete != null)
            {
                _context.Chiimes.Remove(chiimeToDelete);
                await _context.SaveChangesAsync();
                return (chiimeToDelete);
            }
            return null;
        }

        public async Task<Comment?> DeleteComment(Guid id)
        {
            var commentToDelete = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
            if(commentToDelete != null)
            {
                _context.Comments.Remove(commentToDelete);
                await _context.SaveChangesAsync();
                return (commentToDelete);
            }
            return commentToDelete;
        }

        public async Task<List<Chiime>?> GetAllUserChiime(string userName)
        {
            var validUser = await  _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (validUser == null)
            {

                return new List<Chiime>();
            }
            
            

            return await _context.Chiimes.Where(c => c.User.UserName == userName).ToListAsync();

        }

        public async Task<Chiime?> GetChiime(string chiimeId)
        {
            var validChiime = await _context.Chiimes.FirstOrDefaultAsync(c => c.Id.ToString() == chiimeId);
            if(validChiime == null) return null;
            

            return validChiime; 

        }

        public async Task<Comment?> GetComment(Guid id)
        {
            var validComment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
            if(validComment == null) return null;
            return validComment;
        }

       public async Task<List<Comment>?> GetChiimeComments(string chiimeId)
        {
            var validChiime = _context.Chiimes.FirstOrDefault(c =>  c.Id.ToString() == chiimeId);
            if (validChiime == null) { return null; }

            return await _context.Comments.Where(c => c.Chiime.Id.ToString() == chiimeId).ToListAsync();
        }

        public async Task<List<Chiime>> GetFeed(string userName)

        {
            
            
            var followings = await _context.Followings.Where(f => f.UserName == userName).ToListAsync();
            var usersForFeed = new List<string>();
            foreach (var f in followings)
            {
                if (f.NameToFollow != null)
                {
                    usersForFeed.Add(f.NameToFollow);
                }
                
            }
            usersForFeed.Add(userName); //Adding logged in user so their posts fit in as well
            
         
            var allChiimes = await GetAllChiime();
            if(allChiimes == null) return new List<Chiime>();
            List<Chiime> feed = new List<Chiime>();
            foreach(var chiime in allChiimes)
            {
                if (chiime.UserName != null)
                {
                    if (usersForFeed.Contains(chiime.UserName))
                    {
                        feed.Add(chiime);
                    }
                }
                
            }
            
            //Need to sort feed


            return feed;
        }

        public async Task<Chiime?> UpdateChiime(string chiimeId, UpdateChiimeDto chiimeToUpdateDto) //PUT
        {
            var chiimeToUpdate = await _context.Chiimes.FirstOrDefaultAsync(c => c.Id.ToString() == chiimeId);
            if (chiimeToUpdate == null) return null;
            if(chiimeToUpdate != null)
            {
                chiimeToUpdate.Title = chiimeToUpdateDto.Title;
                chiimeToUpdate.EditedDate = DateTime.UtcNow;
                chiimeToUpdate.Content = chiimeToUpdateDto.Content;

            }
             _context.Chiimes.Update(chiimeToUpdate!);
            await _context.SaveChangesAsync();
            return chiimeToUpdate;
            
        }

        public async Task<Comment?> UpdateComment(Comment comment)
        {
            var commentToUpdate = await _context.Comments.FirstOrDefaultAsync(c =>c.Id == comment.Id);
            if(commentToUpdate != null)
            {
                commentToUpdate.Content = comment.Content;
                commentToUpdate.UpdatedDate = DateTime.UtcNow;
            }
            _context.Comments.Update(commentToUpdate!);
            await _context.SaveChangesAsync();
            return commentToUpdate;
        }

        public async Task<List<Chiime>?> GetAllChiime()
        {
            List<Chiime> worldViewChiime = new List<Chiime>();
            worldViewChiime = await _context.Chiimes.ToListAsync();
            worldViewChiime.Sort((x, y) => y.EditedDate.CompareTo(x.EditedDate));
            return worldViewChiime;
        }

        public async Task<List<Chiime>?> DeleteAllUserChiime(string userName)
        {
            var chiimesAll = await _context.Chiimes.Where(c => c.UserName == userName).ToListAsync();
            if(chiimesAll != null)
            {
                _context.Chiimes.RemoveRange(chiimesAll);
                await _context.SaveChangesAsync();
            }
            return null;
            
        }
    }
}
