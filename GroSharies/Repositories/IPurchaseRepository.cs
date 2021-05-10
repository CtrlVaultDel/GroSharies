using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IPurchaseRepository
    {
        List<PurchaseDetail> GetDetailsById(int shoppingListId);
        List<Purchase> GetAllByUserId(int userId);
        void Add(Purchase purchase);
        void Update(Purchase purchase);
        void Delete(int purchaseId);
    }
}