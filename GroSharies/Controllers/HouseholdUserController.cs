using GroSharies.Models.DomainModels;
using GroSharies.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPut("accept/{householdId}")]
        public IActionResult AcceptInvite(int householdId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _householdUserRepository.AcceptInvite(householdId, user.Id);

            return NoContent();
        }

        [HttpDelete("decline/{householdId}")]
        public IActionResult DeclineInvite(int householdId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _householdUserRepository.DeclineInviteOrLeave(householdId, user.Id);

            return NoContent();
        }

        [HttpDelete("leave/{householdId}")]
        public IActionResult LeaveHousehold(int householdId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _householdUserRepository.DeclineInviteOrLeave(householdId, user.Id);

            return NoContent();
        }

        [HttpDelete("kick/{householdUserId}")]
        public IActionResult KickUser(int householdUserId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _householdUserRepository.KickUser(householdUserId);

            return NoContent();
        }
    }
}
