﻿using GroSharies.Models.DataModels;
using GroSharies.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ListItemController : ControllerBase
    {
        private readonly IListItemRepository _listItemRepository;
        private readonly IUserRepository _userRepository;

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

            var listItems = _listItemRepository.GetAllById(shoppingListId);

            return Ok(listItems);
        }

        [HttpPost]
        public IActionResult Add(ListItem listItem)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // Add the purchase object that was passed in to the database
            _listItemRepository.Add(listItem);

            return NoContent();
        }

        [HttpPut("{purchaseId}")]
        public IActionResult Update(ListItem listItem)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            // If all tests pass, update the specified purchase object in the DB
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

        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseId);
        }
    }
}