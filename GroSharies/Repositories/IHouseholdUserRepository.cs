using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IHouseholdUserRepository
    {
        List<HouseholdUserRelation> GetAllByUserId(int userId);
        List<HouseholdUser> GetAllByHousehold(int householdId);
        HouseholdUser GetHouseholdUser(int householdId, int userId);
        void AddAdmin(int householdId, int userId);
    }
}