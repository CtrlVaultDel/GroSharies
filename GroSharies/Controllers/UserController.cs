using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using GroSharies.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        public UserController(
            IUserRepository userRepository,
            IHouseholdUserRepository householdUserRepository,
            IPurchaseRepository purchaseRepository)
        {
            _userRepository = userRepository;
            _householdUserRepository = householdUserRepository;
            _purchaseRepository = purchaseRepository;
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
            if (user == null) return NotFound();
            
            return Ok(user);
        }

        [HttpGet("userProfile")]
        public IActionResult GetUserProfile()
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            var households = _householdUserRepository.GetAllByUserId(user.Id);
            var purchases = _purchaseRepository.GetAllByUserId(user.Id);

            var userProfile = new UserProfile()
            {
                UserInfo = user,
                Households = households,
                Purchases = purchases
            };

            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Register(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(nameof(GetByFirebaseId), new { firebaseId = user.FirebaseId }, user);
        }
    }
}
