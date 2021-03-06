using GroSharies.Models.DataModels;
using GroSharies.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : BaseController
    {
        public PurchaseController(
            IPurchaseRepository purchaseRepository,
            IUserRepository userRepository
        )
        {
            _purchaseRepository = purchaseRepository;
            _userRepository = userRepository;
        }

        [HttpGet("{shoppingListId}")]
        public IActionResult GetAllById(int shoppingListId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            var purchases = _purchaseRepository.GetDetailsById(shoppingListId);

            return Ok(purchases);
        }

        [HttpPost]
        public IActionResult Add(Purchase purchase)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Append the current user's Id to the purchase object
            purchase.UserId = user.Id;

            // Add the purchase object that was passed in to the database
            _purchaseRepository.Add(purchase);

            return NoContent();
        }

        [HttpPut("{purchaseId}")]
        public IActionResult Update(Purchase purchase)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // If all tests pass, update the specified purchase object in the DB
            _purchaseRepository.Update(purchase);

            return NoContent();
        }

        [HttpDelete("{purchaseId}")]
        public IActionResult Delete(int purchaseId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _purchaseRepository.Delete(purchaseId);

            return NoContent();
        }
    }
}
