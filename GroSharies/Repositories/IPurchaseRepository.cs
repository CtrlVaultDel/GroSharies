using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IPurchaseRepository
    {
        List<PurchaseDetail> GetAllById(int shoppingListId);
        void Add(Purchase purchase);
        void Update(Purchase purchase);
        void Delete(int purchaseId);
    }
}