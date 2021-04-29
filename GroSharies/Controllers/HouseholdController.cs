using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using GroSharies.Repositories;
using System.Security.Claims;
using System.Linq;

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
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Get the Id and Name of each Household the user is in and return it
            var userHouseholds = _householdRepository.GetAll(user.Id);
            return Ok(userHouseholds);
        }

        [HttpGet("{householdId}")]
        public IActionResult GetById(int householdId) 
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Check to make sure that one of the user's household Id's matches the one being searched for
            var userHouseholds = _householdRepository.GetAll(user.Id);
            if (!userHouseholds.Any(household => household.Id == householdId)) return NotFound();

            var householdDetail = _householdRepository.GetById(householdId);          
            return Ok(householdDetail);
        }

        [HttpPost]
        public IActionResult Add(Household household)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Add the household object that was passed in to the database
            _householdRepository.Add(household, user.Id);
            return CreatedAtAction("Get", new { id = household.Id }, household);
        }

        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseId);
        }
    }
}
