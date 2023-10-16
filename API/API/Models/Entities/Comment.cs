using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models.Entities
{
    public class Comment
    {
       
        public Guid Id { get; set; }
        
        [Required]
        public string? UserName { get; set; }
        [Required]
        public Guid ChiimeId { get; set; }
        public string? ParentCommentId { get; set; }

        public required string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        

        [JsonIgnore]
        public virtual  Chiime Chiime { get; set; }
       
        [JsonIgnore]
        public virtual  User User { get; set; }


        
    }
}
