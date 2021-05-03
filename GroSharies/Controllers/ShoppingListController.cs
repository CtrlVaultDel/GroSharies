using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using GroSharies.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly IShoppingListRepository _shoppingListRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPurchaseRepository _purchaseRepository;
        private readonly IListItemRepository _listItemRepository;

        public ShoppingListController(
            IShoppingListRepository shoppingListRepository,
            IUserRepository userRepository,
            IPurchaseRepository purchaseRepository,
            IListItemRepository listItemRepository
        )
        {
            _shoppingListRepository = shoppingListRepository;
            _userRepository = userRepository;
            _purchaseRepository = purchaseRepository;
            _listItemRepository = listItemRepository;
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
            var purchases = _purchaseRepository.GetAllById(shoppingListId);

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

            return CreatedAtAction(nameof(GetById), new { shoppingListId = shoppingList.Id }, shoppingList);
        }

        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseId);
        }
    }
}

   
