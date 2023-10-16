using System.ComponentModel.DataAnnotations;

namespace API.Models.DTOs
{
    public class RegisterDto
    {

        [Required]
        [StringLength(25, MinimumLength =5)]
        public required string UserName { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 6,  ErrorMessage = "Password can be a max of 15 characters and a minimum of 6.")]
        
        public required string Password { get; set; }

        public string? Bio { get; set; } = null;
        public string? AvatarSelection { get; set; } = null;

    }
}
