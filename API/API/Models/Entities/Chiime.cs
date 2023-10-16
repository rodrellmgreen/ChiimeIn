using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Text.Json.Serialization;

namespace API.Models.Entities
{
    public class Chiime
    {
       
        public Guid Id { get; set; }

        [Required]
        public required string UserName { get; set; }
        public required string Title { get; set; }
        [MaxLength(500)]
        public required string Content { get; set; }
        [MaxLength(50)] 
        
        
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime EditedDate { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public virtual  User User { get; set; }
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
        




    }
}
