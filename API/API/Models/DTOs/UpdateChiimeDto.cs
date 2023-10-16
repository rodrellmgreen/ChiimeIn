namespace API.Models.DTOs
{
    public class UpdateChiimeDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime EditedDate { get; set; } = DateTime.UtcNow;
    }
}
