using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Models.DomainModels
{
    public class HouseholdDetail
    {
        public Household Household { get; set; }
        public List<HouseholdUser> HouseholdUsers { get; set; }
        public List <ShoppingList> ShoppingLists { get; set; }
    }
}
