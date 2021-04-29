using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Models;
using GroSharies.Repositories;
using System.Security.Claims;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HouseholdController : ControllerBase
    {
        private readonly IHouseholdRepository _householdRepository;
        private readonly IUserRepository _userRepository;

        public HouseholdController(
            IHouseholdRepository householdRepository, 
            IUserRepository userRepository)
        {
            _householdRepository = householdRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            // Get the current user by using the FirebaseId
            var user = GetCurrentUser();

            // If no user is returned, do not continue
            if (user == null) return NotFound();

            // Get the Id and Name of each Household the user is in and return it
            var userHouseholds = _householdRepository.GetAll(user.Id);
            return Ok(userHouseholds);
        }

        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseId);
        }
    }
}
