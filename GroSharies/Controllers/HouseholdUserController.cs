using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Repositories;
using GroSharies.Models.DomainModels;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HouseholdUserController : BaseController
    {
        public HouseholdUserController(
            IHouseholdUserRepository householdUserRepository,
            IUserRepository userRepository)
        {
            _householdUserRepository = householdUserRepository;
            _userRepository = userRepository;
        }

        [HttpGet("{householdId}")]
        public IActionResult GetHouseholdUsers(int householdId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // If all tests pass, update the Household Name
            var householdUsers = _householdUserRepository.GetEmailsByHousehold(householdId);

            return Ok(householdUsers);
        }

        [HttpPost]
        public IActionResult SendInvitation(Invitation invitation)
        {
            var userId = _userRepository.GetUserIdByEmail(invitation.email);
            if (userId == 0) return NotFound();

            _householdUserRepository.InviteMember(invitation.householdId, userId);

            return NoContent();
        }
    }
}
