namespace API.Models.DTOs
{
    public class CommentRequestDto
    {

        public string? ChiimeId { get; set; }
        public string? ParentCommentId { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime EditedDate { get; set; }
    }
}
