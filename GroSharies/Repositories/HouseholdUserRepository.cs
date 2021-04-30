using GroSharies.Utils;
using Microsoft.Extensions.Configuration;

namespace GroSharies.Repositories
{
    public class HouseholdUserRepository : BaseRepository, IHouseholdUserRepository
    {
        public HouseholdUserRepository(IConfiguration configuration) : base(configuration) { }

        public void AddAdmin(int householdId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO HouseholdUser (HouseholdId, UserId, UserTypeId, IsAccepted)
                        VALUES (@HouseholdId, @UserId, 1, 1)";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);
                    DbUtils.AddParameter(cmd, "@UserId", userId);
                }
            }
        }
    }
}
