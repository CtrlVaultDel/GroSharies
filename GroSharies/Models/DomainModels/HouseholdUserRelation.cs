using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using System.Collections.Generic;

namespace GroSharies.Models.DomainModels
{
    public class HouseholdUserRelation
    {
        public Household Household { get; set; }
        public HouseholdUser Relation { get; set; }
        public List<UserDetail> UserDetails { get; set; }
        public int NumUsers { get; set; }
        public int NumLists { get; set; }
    }
}
