using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Models.DomainModels
{
    public class ShoppingListDetail
    {
        public ShoppingList ShoppingList { get; set; }
        public List<ListItem> ListItems { get; set; }
        public List<PurchaseDetail> Purchases { get; set; }
    }
}
