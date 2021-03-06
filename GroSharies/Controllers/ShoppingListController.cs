using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using GroSharies.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : BaseController
    {
        public ShoppingListController(
            IShoppingListRepository shoppingListRepository,
            IUserRepository userRepository,
            IPurchaseRepository purchaseRepository,
            IListItemRepository listItemRepository,
            IHouseholdRepository householdRepository
        )
        {
            _shoppingListRepository = shoppingListRepository;
            _userRepository = userRepository;
            _purchaseRepository = purchaseRepository;
            _listItemRepository = listItemRepository;
            _householdRepository = householdRepository;
        }

        [HttpGet("{shoppingListId}")]
        public IActionResult GetById(int shoppingListId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Get the ShoppingList object based off the passed in Id
            var shoppingList = _shoppingListRepository.GetById(shoppingListId);

            // Get the List of Shopping List Items (ListItem)
            var listItems = _listItemRepository.GetAllById(shoppingListId);

            // Get the List of Shopping List Purchases (Purchase)
            var purchases = _purchaseRepository.GetDetailsById(shoppingListId);

            // Save all of the relevant data in a single details object
            var shoppingListDetail = new ShoppingListDetail()
            {
                ShoppingList = shoppingList,
                ListItems = listItems,
                Purchases = purchases
            };

            return Ok(shoppingListDetail);
        }

        [HttpPost]
        public IActionResult Add(ShoppingList shoppingList)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Add the shoppingList object that was passed in to the database
            _shoppingListRepository.Add(shoppingList);

            return NoContent();
        }

        [HttpPut("{shoppingListId}")]
        public IActionResult Update(ShoppingList shoppingList)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Check to make sure that one of the user's household Id's matches the one being searched for
            var userHouseholds = _householdRepository.GetAllHouseholds(user.Id);
            if (!userHouseholds.Any(userHousehold => userHousehold.Id == shoppingList.HouseholdId)) return Unauthorized();

            // If all tests pass, update the ShoppingList Name
            _shoppingListRepository.Update(shoppingList);

            return NoContent();
        }

        [HttpDelete("{shoppingListId}")]
        public IActionResult Delete(int shoppingListId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _shoppingListRepository.Delete(shoppingListId);
            return NoContent();
        }
    }
}

   
