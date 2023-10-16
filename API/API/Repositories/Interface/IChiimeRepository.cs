using API.Models.DTOs;
using API.Models.Entities;

namespace API.Repositories.Interface
{
    public interface IChiimeRepository
    {
        Task<Chiime?> CreateChiime(Chiime chiime);
        Task<Chiime?> GetChiime(string id);
        Task<Chiime?> UpdateChiime(string chiimeId, UpdateChiimeDto chiimeToUpdate);
        Task<Comment?> UpdateComment(Comment comment);
        Task<Chiime?> DeleteChiime(Guid id);
        Task<Comment?> CreateComment(Comment comment);
        Task<Comment?> DeleteComment(Guid id);
        Task<Comment?> GetComment(Guid id);
        Task<List<Comment>?> GetChiimeComments(string chiimeId);
        Task<List<Chiime>?> GetAllChiime();

        Task<List<Chiime>?> GetAllUserChiime(string UserName); //For User's profile
        Task<List<Chiime>> GetFeed(string userId); //For User's feed, to show on Chiime from those he follows
        Task<List<Chiime>?> DeleteAllUserChiime(string userName);
    }
}
