using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.Entities
{
    public class User : IdentityUser
    {
        
        public override string? UserName {  get; set; }
        public string? Bio { get; set; }
        
        public ICollection<Chiime> Chiimes { get; set; } = new List<Chiime>();
        public ICollection<Following> Followings { get; set; } = new List<Following>();
      
        public ICollection<Comment> Comments { get; set; } = new List <Comment> ();
        
    }
}
