using GroSharies.Models.DataModels;

namespace GroSharies.Repositories
{
    public interface IHouseholdUserRepository
    {
        public HouseholdUser GetHouseholdUser(int householdId, int userId);
        public void AddAdmin(int householdId, int userId);
    }
}