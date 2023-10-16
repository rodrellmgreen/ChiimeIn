using API.Models.Entities;

namespace API.Models.DTOs
{
    public class ProfileDto 
    {
        public string? UserName { get; set; }
        public string? Bio { get; set; } = "";
        
        public List<Chiime>? ChiimeList { get; set; } = new List<Chiime>();
        public List<string>? Followers { get; set; } = new List<string>();
       
    }
}
