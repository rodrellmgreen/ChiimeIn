using API.Data;
using API.Models.Entities;
using API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Implementation
{
    public class FollowingRepository : IFollowingRepository
    {
        private readonly Context _context;

        public FollowingRepository(Context context)
        {
            _context = context;
        }
        public async Task<Following> Follow(Following following) //Post
        {
            await _context.AddAsync(following);
            await _context.SaveChangesAsync();
            return following;
        }

     

        public async Task<List<string>> GetFollowers(string UserName) 
        {

            List<Following> followersForUserName = await  _context.Followings.Where(f => f.NameToFollow == UserName).ToListAsync();
            List<string> followersForRequestedProfile = new List<string>();
            foreach (Following f in followersForUserName)
            {
                followersForRequestedProfile.Add(f.UserName); //List of all users who followed the nameToFollow/profile
            }
            
            return followersForRequestedProfile;
        }

        public async Task<string?> Unfollow(string nameToUnfollow, string loggedInUserName) //delete
        {
            List<Following> followingToRemove =  await _context.Followings.Where(f => f.UserName == loggedInUserName && f.NameToFollow == nameToUnfollow).ToListAsync();
                foreach (Following f in followingToRemove)
            {
                _context.Followings.Remove(f);
                
            }
               
                await _context.SaveChangesAsync();
                return nameToUnfollow;
        }
    }
}
