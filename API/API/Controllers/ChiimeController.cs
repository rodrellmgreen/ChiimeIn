using API.Models.DTOs;
using API.Models.Entities;
using API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Net.NetworkInformation;
using System.Security.Claims;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ChiimeController : ControllerBase
    {
        private readonly IChiimeRepository _chiimeRepository;
        private readonly UserManager<User> _userManager;
        private readonly IFollowingRepository _followingRepository;
        
       

        public ChiimeController(IChiimeRepository chiimeRepository, UserManager<User> userManager, IFollowingRepository followingRepository)
        {
            _chiimeRepository = chiimeRepository;
            _userManager = userManager;
            _followingRepository = followingRepository;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateChiime([FromBody] ChiimeRequestDto chiimeDto)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (user == null) { return BadRequest("Invalid User"); }
           

            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (userName == null) return BadRequest("User invalid");
            //Guid userIdConvert = new Guid(userId);

            var newChiime = new Chiime
            {

                
                UserName = userName,
                Title = chiimeDto.Title,
                Content = chiimeDto.Content,
                CreatedDate = chiimeDto.CreatedDate,
                EditedDate = chiimeDto.EditedDate,
                User = user,
                


            };

           var postedChiime = await _chiimeRepository.CreateChiime(newChiime);
            return Ok(postedChiime);
        }

        [HttpGet]
        [Route("profile/{userName}")]
        public async Task<IActionResult> GetProfile([FromRoute] string userName)
        {
            var getUser = await _userManager.FindByNameAsync(userName);
            if (getUser == null) { return NotFound(); }
            var userChiime = await _chiimeRepository.GetAllUserChiime(userName);
            

            
            var followers = await _followingRepository.GetFollowers(userName);



            var response = new ProfileDto
            {
                UserName = userName,
                Bio = getUser.Bio,
                
                ChiimeList = userChiime,
                Followers = followers

            };

            return Ok(response);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChiime([FromRoute] string id)
        {
            if (id == null) return NotFound();
            var chiimeIdToDelete = new Guid(id);
            var chiimePresent = await _chiimeRepository.GetChiime(id);
            if (chiimePresent == null) { return NotFound("The selected chiime does not exist!"); }
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (userName == null) { return Unauthorized("You must be logged in to do this!"); }
            if (chiimePresent.UserName != userName) return Unauthorized("Only the user who posted can delete this!");
            await _chiimeRepository.DeleteChiime(chiimeIdToDelete);
            return Ok("Chiime deleted successfully");
        }

        [Authorize]
        [HttpDelete("comment/{id}")]
        public async Task<IActionResult> DeleteComment([FromRoute] string id)
        {
            if (id == null) return NotFound();
            var commentIdToDelete = new Guid(id);
            var commentPresent = await _chiimeRepository.GetComment(commentIdToDelete);
            if (commentPresent == null) { return NotFound("Comment does not exist"); }
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (commentPresent.UserName != userName) return Unauthorized("Only the user who posted can delete this.");
            await _chiimeRepository.DeleteComment(commentIdToDelete);
            return Ok("Comment Deleted!");
        }


        [HttpGet("{chiimeId}")]
        public async Task<IActionResult> GetChiime([FromRoute] string chiimeId)
        {
            
            var chiimeToView = await _chiimeRepository.GetChiime(chiimeId);
            if (chiimeToView == null) { return NotFound("The selected chiime does not exist!"); }
            var CommentList = await _chiimeRepository.GetChiimeComments(chiimeId);

            var chiimeDisplay = new ChiimeResponseDto
            {
                Id = chiimeId,
                Title = chiimeToView.Title,
                UserName = chiimeToView.UserName,
                Content = chiimeToView.Content,
                CreatedDate = chiimeToView.CreatedDate,
                EditedDate = chiimeToView.EditedDate,
                CommentList = CommentList,

            };
            return Ok(chiimeDisplay);

        }

        [Authorize]
        [HttpPut("{chiimeId}/edit")]
        public async Task<IActionResult> EditChiime([FromRoute] string chiimeId, [FromBody] UpdateChiimeDto chiimeToUpdate)
        {


            var chiimePresent = await _chiimeRepository.GetChiime(chiimeId);
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (chiimePresent == null || chiimePresent.UserName == null) { return NotFound("The selected chiime does not exist!"); }
            if (chiimePresent.UserName != userName) return Unauthorized("Only the user who posted can update this!");
            
            var updatedChiime = await _chiimeRepository.UpdateChiime(chiimeId, chiimeToUpdate);
            return Ok(updatedChiime);
        }


        [Authorize]
        [HttpPost("{chiimeId}/comment")]
        public async Task<IActionResult> PostComment([FromRoute] string chiimeId, [FromBody] CommentRequestDto commentDto)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            var userName = User.FindFirstValue(ClaimTypes.Name);
            
            if (userName == null || user == null) return BadRequest("Please login/register");
            
           
            
            var chiimeToCommentOn = await _chiimeRepository.GetChiime(chiimeId);
            if (chiimeToCommentOn == null || chiimeToCommentOn.UserName == null) { return NotFound("The selected chiime does not exist! Comment not posted!"); }
            var newComment = new Comment
            {
                
                UserName = userName,
                Content = commentDto.Content,
                Chiime = chiimeToCommentOn,
                ParentCommentId = commentDto.ParentCommentId,

                User = user
                

            };
            await _chiimeRepository.CreateComment(newComment);
            return Ok(newComment);


        }

        [Authorize]
        [HttpGet("home")]
        public async Task<IActionResult> GetFeed()
        {
            
            
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (userName == null) return BadRequest("Please login/register to continue");
            List<Chiime> feed = new List<Chiime>();
            feed = await _chiimeRepository.GetFeed(userName);
            if (feed == null || feed.Count < 1) return Ok();
            

            return Ok(feed);
        }

        [Authorize]
        [HttpPost("follow/{nameToFollow}")]
        public async Task<IActionResult> FollowUser([FromRoute] String nameToFollow)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);

            var followersOfNtf = await _followingRepository.GetFollowers(nameToFollow);
            if (followersOfNtf.Contains(user.UserName)) return BadRequest("You already follow this user!");
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (user == null || userName == null) return BadRequest("You must login to follow someone");
            if (userName == nameToFollow) return BadRequest("You can't follow yourself");
            var follow = new Following
            {
                UserName = userName,
                NameToFollow = nameToFollow,
                User = user
            };
            var followSuccess = await _followingRepository.Follow(follow);

            return Ok();

        }

        //Revisit code here

        [Authorize]
        [HttpDelete("follow/{nameToUnfollow}")]
        public async Task<IActionResult> UnfollowUser([FromRoute] string nameToUnfollow)
        {
            var loggedInUserName = User.FindFirstValue(ClaimTypes.Name);
            if (loggedInUserName == null) return BadRequest("You must be logged in to unfollow someone");
            var unfollow = await _followingRepository.Unfollow(nameToUnfollow, loggedInUserName);
            if (unfollow == null ) return BadRequest("It looks like you already unfollowed this user.");
            return Ok();
        }

        [Authorize]
        [HttpPut("{chiimeId}/comment/{commentId}")]
        public async Task<IActionResult> EditComment([FromRoute] string chiimeId, [FromRoute] string commentId, [FromBody] CommentRequestDto comment)
        {
            var chiimeGuid = new Guid(chiimeId);
            var validChiime = await _chiimeRepository.GetChiime(chiimeId);
            if (validChiime == null || validChiime.User == null) return BadRequest("The Chiime the comment was on has been deleted!");
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (userName == null) return BadRequest("You must be logged in!");
            var commentGuid = new Guid(commentId);
            var validComment = await _chiimeRepository.GetComment(commentGuid);
            if (validComment == null || validComment.User == null) return BadRequest("Comment already deleted.");
            if (validComment.User.UserName != userName) return BadRequest("Only the user who created this comment can delete it");
            if (validComment.Chiime != validChiime) return BadRequest("Error retrieving Chiime related to comment!");
            var commentToUpdate = new Comment
            {
                Id = validComment.Id,
                UserName = validComment.UserName,
                Content = comment.Content,
                UpdatedDate = DateTime.UtcNow,
                Chiime = validChiime,
                User = validComment.User,
            };

            await _chiimeRepository.UpdateComment(commentToUpdate);
            return Ok(commentToUpdate);

        }
        [Authorize]
        [HttpDelete("user/all")]
        public async Task<IActionResult> DeleteAllUserChiime()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (userName == null) return BadRequest(string.Empty);
            await _chiimeRepository.DeleteAllUserChiime(userName);
            return Ok();

        }

       
        [HttpGet("all")]
        public async Task<IActionResult> GetPublicChiimeView()
        {
            var publicView = await _chiimeRepository.GetAllChiime();
            if(publicView == null) return Ok("Be the first to post!");

            return Ok(publicView);

        }
    }
}
