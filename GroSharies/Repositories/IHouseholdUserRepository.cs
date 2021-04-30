namespace GroSharies.Repositories
{
    public interface IHouseholdUserRepository
    {
        void AddAdmin(int householdId, int userId);
    }
}