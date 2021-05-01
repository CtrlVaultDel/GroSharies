using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Models.DataModels;
using System.Security.Claims;
using GroSharies.Repositories;
using System.Collections.Generic;
using GroSharies.Models.DomainModels;

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
        public IActionResult GetAllByUserId()
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            List<HouseholdUserRelation> userHouseholds = _householdUserRepository.GetAllByUserId(user.Id);

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
