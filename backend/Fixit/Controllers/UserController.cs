using Fixit.API.Helper;
using Fixit.Interfaces;
using Fixit.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fixit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/user
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            
            var users = await _userRepository.GetUsersWithRelationsAsync();
            return Ok(users);
        }

        // GET: api/user/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var newUser = await _userRepository.AddAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrEmpty(loginUser.Email) || string.IsNullOrEmpty(loginUser.Password))
                return BadRequest("Email and password are required");

            var user = await _userRepository.LoginUserAsync(loginUser.Email, loginUser.Password);
            if (user == null)
                return Unauthorized("Invalid email or password");

            return Ok(user);
        }


        // PUT: api/user/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (id != user.Id)
                return BadRequest("ID mismatch");

            var updatedUser = await _userRepository.UpdateAsync(user);
            if (updatedUser == null)
                return NotFound();

            return Ok(updatedUser);
        }

        // DELETE: api/user/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userRepository.DeleteAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
