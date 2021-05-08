using GroSharies.Models.DataModels;
using GroSharies.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GroSharies.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IUserRepository _userRepository;
        protected IHouseholdRepository _householdRepository;
        protected IHouseholdUserRepository _householdUserRepository;
        protected IShoppingListRepository _shoppingListRepository;
        protected IListItemRepository _listItemRepository;
        protected IPurchaseRepository _purchaseRepository;
        protected User user;

        public BaseController() {}

        // Retrieves the current user object by using the provided firebaseId
        protected User GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseId);
        }
    }
}
