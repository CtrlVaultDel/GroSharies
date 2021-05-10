using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Models.DataModels;
using GroSharies.Repositories;
using System.Security.Claims;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllEmails()
        {
            var emails = _userRepository.GetAllEmails();
            return Ok(emails);
        }

        [HttpGet("{firebaseId}")]
        public IActionResult GetByFirebaseId(string firebaseId)
        {
            var user = _userRepository.GetByFirebaseId(firebaseId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Register(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(nameof(GetByFirebaseId), new { firebaseId = user.FirebaseId }, user);
        }
    }
}
