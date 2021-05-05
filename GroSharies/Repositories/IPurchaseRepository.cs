using GroSharies.Models.DomainModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IPurchaseRepository
    {
        List<PurchaseDetail> GetAllById(int shoppingListId);
    }
}