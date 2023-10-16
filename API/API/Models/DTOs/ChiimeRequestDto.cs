namespace API.Models.DTOs
{
    public class ChiimeRequestDto
    {
        
        public required string Title { get; set; }
      
        public required string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime EditedDate { get; set; }
    }
}
