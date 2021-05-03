using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IPurchaseRepository
    {
        List<Purchase> GetAllById(int shoppingListId);
    }
}