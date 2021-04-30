using GroSharies.Utils;
using Microsoft.Extensions.Configuration;
using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public class HouseholdUserRepository : BaseRepository, IHouseholdUserRepository
    {
        public HouseholdUserRepository(IConfiguration configuration) : base(configuration) { }

        public List<HouseholdUser> GetByUserId(int userId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, HouseholdId, UserId, UserTypeId, IsAccepted
                        FROM HouseholdUser
                        WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "UserId", userId);

                    var reader = cmd.ExecuteReader();

                    List<HouseholdUser> householdUserList = null;

                    while (reader.Read())
                    {
                        var householdUser = new HouseholdUser()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            HouseholdId = DbUtils.GetInt(reader, "HouseholdId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            IsAccepted = DbUtils.GetBool(reader, "IsAccespted")
                        };
                        householdUserList.Add(householdUser);
                    }
                    reader.Close();
                    return householdUserList;
                }
            }
        }

        public HouseholdUser GetHouseholdUser(int householdId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, HouseholdId, UserId, UserTypeId, IsAccepted
                        FROM HouseholdUser
                        WHERE UserId = @UserId AND HouseholdId = @HouseholdId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);

                    var reader = cmd.ExecuteReader();

                    HouseholdUser householdUser = null;

                    if (reader.Read())
                    {
                        householdUser = new HouseholdUser()
                        {                         
                            Id = DbUtils.GetInt(reader, "Id"),
                            HouseholdId = DbUtils.GetInt(reader, "HouseholdId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            IsAccepted = DbUtils.GetBool(reader, "IsAccepted")                           
                        };
                    }                              
                    reader.Close();
                    return householdUser;
                }
            }
        }

        public void AddAdmin(int householdId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO HouseholdUser (HouseholdId, UserId, UserTypeId, IsAccepted)
                        OUTPUT INSERTED.ID
                        VALUES (@HouseholdId, @UserId, 1, 1)";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
