using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Models.DataModels;
using System.Security.Claims;
using GroSharies.Repositories;
using System.Collections.Generic;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HouseholdUserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IHouseholdUserRepository _householdUserRepository;

        public HouseholdUserController(
           IUserRepository userRepository,
           IHouseholdUserRepository householdUserRepository)
        {
            _userRepository = userRepository;
            _householdUserRepository = householdUserRepository;
        }

        [HttpGet]
        public IActionResult GetByUserId()
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            List<HouseholdUser> householdUserList = _householdUserRepository.GetByUserId(user.Id);

            return Ok(householdUserList);
        }

        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseId);
        }
    }
}
