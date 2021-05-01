using GroSharies.Models.DataModels;

namespace GroSharies.Models.DomainModels
{
    public class HouseholdUserRelation
    {
        public Household Household { get; set; }
        public HouseholdUser Relation { get; set; }
    }
}
