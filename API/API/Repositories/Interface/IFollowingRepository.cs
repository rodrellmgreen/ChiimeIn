using API.Models.Entities;

namespace API.Repositories.Interface
{
    public interface IFollowingRepository
    {
        Task<Following> Follow(Following following);
        Task<string?> Unfollow(string nameToUnfollow, string loggedInUserName);
        Task<List<string>> GetFollowers(string UserName); //Only used to populate Chiime feed
        //Task<Following> GetFollowers(Guid UserId);
    }
}
