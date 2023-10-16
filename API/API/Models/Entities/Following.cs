using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.Entities
{
    public class Following
    {
        
        public Guid Id { get; set; }
        [Required]
        public required string UserName { get; set; }
        public required string NameToFollow { get; set; }
        
        public virtual required User User { get; set; }
        
        
        
       
    }
}
