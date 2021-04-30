using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IHouseholdUserRepository
    {
        public List<HouseholdUser> GetByUserId(int userId);
        public HouseholdUser GetHouseholdUser(int householdId, int userId);
        public void AddAdmin(int householdId, int userId);
    }
}