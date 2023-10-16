using System.ComponentModel.DataAnnotations;

namespace API.Models.DTOs
{
    public class LoginDto
    {
        [Required]
        public required string UserName { get; set; }
        [Required]
        public required string Password { get; set; }
    }
}
