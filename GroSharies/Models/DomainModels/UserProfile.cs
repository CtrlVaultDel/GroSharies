using GroSharies.Models.DataModels;
using System.Collections.Generic;
using System.Linq;

namespace GroSharies.Models.DomainModels
{
    public class UserProfile
    {
        public User UserInfo { get; set; }
        public List<HouseholdUserRelation> Households {get; set;}
        public List<Purchase> Purchases { get; set; }
    }
}
