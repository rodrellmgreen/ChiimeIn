using API.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace API.Models.DTOs
{
    public class ChiimeResponseDto
    {
        public required string Id { get; set; }
        public  string? UserName { get; set; }
        public string? Title { get; set; }
        public  string? Content { get; set; }
        
        public DateTime CreatedDate { get; set; }
        public DateTime EditedDate { get; set; }

        public List<Comment>? CommentList { get; set; } = new List<Comment>();

    }
}
