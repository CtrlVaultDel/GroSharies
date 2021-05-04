using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IShoppingListRepository
    {
        List<ShoppingList> GetAllById(int householdId);
        ShoppingList GetById(int shoppingListId);
        void Add(ShoppingList shoppingList);
        void Update(ShoppingList shoppingList);
        void Delete(int shoppingListId);
    }
}