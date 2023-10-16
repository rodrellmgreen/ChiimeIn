using API.Models.DTOs;
using API.Models.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly ITokenService tokenService;
        

        public AccountController(UserManager<User> userManager, ITokenService tokenService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
        }
        //POST: /api/account/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var identityUser = await this.userManager.FindByNameAsync(request.UserName);
            if (identityUser is not null)
            {
                var checkPasswordResult = await this.userManager.CheckPasswordAsync(identityUser, request.Password);
                if (checkPasswordResult)
                {
                    
                    //Create a Token and Response
                    var jwtToken = tokenService.CreateToken(identityUser);

                    var response = new UserDto()
                    {
                        UserName = request.UserName,
                        Token = jwtToken
                    };

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "UserName or Password Incorrect");
            return ValidationProblem(ModelState);
        }

        //POST: /api/account/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto request)
        {
            //Create IdentityUser object

            var user = new User
            {
                UserName = request.UserName,
                Bio = request.Bio,
               
                
            };

            //Create User

            var identityResult = await this.userManager.CreateAsync(user, request.Password);

            if (identityResult.Succeeded)
            {

                return Ok(); }

            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);
        }

        [HttpGet]
        [Route("users")]
        public async Task<List<string>> GetUsers()
        {
            var users = await this.userManager.Users.ToListAsync();
            
            var userList = new List<string>();
            foreach (var user in users)
            {
                if (user.UserName != null) 
                {
                    userList.Add(user.UserName);
                }

                
            }

            return userList;
        }
        [Authorize]
        [HttpPut]
        [Route("profile/edit")]
        public async Task<ProfileDto?> EditProfile(ProfileDto profile)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId == null)return null;
            var user = await this.userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return null;
            }
            user.Bio = profile.Bio;
            
            await this.userManager.UpdateAsync(user);


            return new ProfileDto
            {
                Bio = user.Bio,
               
                ChiimeList = user.Chiimes.ToList(),
            };
        }
    }
}