using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Models.DataModels;
using GroSharies.Repositories;
using System.Security.Claims;
using System.Linq;
using GroSharies.Models.DomainModels;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HouseholdController : ControllerBase
    {
        private readonly IHouseholdRepository _householdRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHouseholdUserRepository _householdUserRepository;
        private readonly IShoppingListRepository _shoppingListRepository;

        public HouseholdController(
            IHouseholdRepository householdRepository,
            IUserRepository userRepository,
            IHouseholdUserRepository householdUserRepository,
            IShoppingListRepository shoppingListRepository)
        {
            _householdRepository = householdRepository;
            _userRepository = userRepository;
            _householdUserRepository = householdUserRepository;
            _shoppingListRepository = shoppingListRepository;
        }

        [HttpGet]
        public IActionResult GetAllByUserId()
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Get the Id and Name of each Household the user is in and return it
            var userHouseholds = _householdUserRepository.GetAllByUserId(user.Id);

            foreach (var hur in userHouseholds)
            {
                hur.NumUsers = _householdUserRepository.CountHouseholdUsers(hur.Household.Id);
                hur.NumLists = _householdUserRepository.CountHouseholdLists(hur.Household.Id);
            }
            return Ok(userHouseholds);
        }

        [HttpGet("{householdId}")]
        public IActionResult GetById(int householdId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Check to make sure that one of the user's household Id's matches the one being searched for
            var userHouseholds = _householdRepository.GetAllHouseholds(user.Id);
            if (!userHouseholds.Any(household => household.Id == householdId)) return Unauthorized();

            // Get the specified household
            var household = _householdRepository.GetById(householdId);

            // Get the specified household's userRelations
            var householdUsers = _householdUserRepository.GetAllByHousehold(householdId);

            // Get the specified household's shopping list(s)
            var shoppingLists = _shoppingListRepository.GetAllById(householdId);

            var householdDetail = new HouseholdDetail()
            {
                Household = household,
                HouseholdUsers = householdUsers,
                ShoppingLists = shoppingLists
            };

            return Ok(householdDetail);
        }

        [HttpPost]
        public IActionResult Add(Household household)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Add the household object that was passed in to the database
            _householdRepository.Add(household, user.Id);

            // Add the relationship between the user and the new household (Admin)
            _householdUserRepository.AddAdmin(household.Id, user.Id);

            return CreatedAtAction(nameof(GetById), new { householdId = household.Id }, household);
        }

        [HttpPut("{householdId}")]
        public IActionResult Update(Household household)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Check to make sure that one of the user's household Id's matches the one being searched for
            var userHouseholds = _householdRepository.GetAllHouseholds(user.Id);
            if (!userHouseholds.Any(userHousehold => userHousehold.Id == household.Id)) return Unauthorized();

            // Check to make sure that the current user is an admin of the selected household
            var householdUser = _householdUserRepository.GetHouseholdUser(household.Id, user.Id);
            if (householdUser.UserTypeId != 1) return Unauthorized();

            // If all tests pass, update the Household Name
            _householdRepository.Update(household);

            return NoContent();
        }

        [HttpDelete("{householdId}")]
        public IActionResult Delete(int householdId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Check to make sure that the current user is an admin of the selected household
            var householdUser = _householdUserRepository.GetHouseholdUser(householdId, user.Id);
            if (householdUser.UserTypeId != 1) return Unauthorized();

            _householdRepository.Delete(householdId);
            return NoContent();
        }

        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseId);
        }
    }
}
