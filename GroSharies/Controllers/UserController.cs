using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Models;
using GroSharies.Repositories;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseId(string firebaseUserId)
        {
            var userProfile = _userRepository.GetByFirebaseId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Register(User user)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetByFirebaseId), new { firebaseId = user.FirebaseId }, user);
        }
    }
}
