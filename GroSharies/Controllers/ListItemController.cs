using GroSharies.Models.DataModels;
using GroSharies.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ListItemController : BaseController
    {
        public ListItemController(
            IListItemRepository listItemRepository,
            IUserRepository userRepository
        )
        {
            _listItemRepository = listItemRepository;
            _userRepository = userRepository;
        }

        [HttpGet("{shoppingListId}")]
        public IActionResult GetAllById(int shoppingListId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Get all listItems associated with the shoppingListId passed in
            var listItems = _listItemRepository.GetAllById(shoppingListId);

            return Ok(listItems);
        }

        [HttpPost]
        public IActionResult Add(ListItem listItem)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Add the listItem object that was passed in to the database
            _listItemRepository.Add(listItem);

            return NoContent();
        }

        [HttpPut("toggle/{listItemId}")]
        public IActionResult Toggle(ListItem listItem)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Toggle the IsChecked value of the passed in listItem object
            _listItemRepository.Toggle(listItem);

            return NoContent();
        }

        [HttpPut("check-all/{shoppingListId}")]
        public IActionResult CheckAll(int shoppingListId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _listItemRepository.CheckAll(shoppingListId);

            return NoContent();
        }

        [HttpPut("uncheck-all/{shoppingListId}")]
        public IActionResult UnCheckAll(int shoppingListId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _listItemRepository.UnCheckAll(shoppingListId);

            return NoContent();
        }

        [HttpPut("{listItemId}")]
        public IActionResult Update(ListItem listItem)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // If all tests pass, update the specified listItem object in the DB
            _listItemRepository.Update(listItem);

            return NoContent();
        }

        [HttpDelete("{listItemId}")]
        public IActionResult Delete(int listItemId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _listItemRepository.Delete(listItemId);

            return NoContent();
        }
    }
}