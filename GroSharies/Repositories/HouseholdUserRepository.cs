using GroSharies.Utils;
using Microsoft.Extensions.Configuration;
using GroSharies.Models.DataModels;
using System.Collections.Generic;
using GroSharies.Models.DomainModels;

namespace GroSharies.Repositories
{
    public class HouseholdUserRepository : BaseRepository, IHouseholdUserRepository
    {
        public HouseholdUserRepository(IConfiguration configuration) : base(configuration) { }

        public List<HouseholdUserRelation> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        hu.Id, hu.HouseholdId, hu.UserId, hu.UserTypeId, hu.IsAccepted,
                        h.Name AS HouseholdName
                        FROM Household h
                        JOIN HouseholdUser hu ON h.Id = hu.HouseholdId
                        WHERE hu.UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var householdUserRelations = new List<HouseholdUserRelation>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var relation = new HouseholdUserRelation()
                        {
                            Household = new Household()
                            {
                                Id = DbUtils.GetInt(reader, "HouseholdId"),
                                Name = DbUtils.GetString(reader, "HouseholdName"),
                            },
                            Relation = new HouseholdUser()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                HouseholdId = DbUtils.GetInt(reader, "HouseholdId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                IsAccepted = DbUtils.GetBool(reader, "IsAccepted")
                            }
                        };
                        householdUserRelations.Add(relation);
                    }
                    reader.Close();

                    return householdUserRelations;
                }
            }
        }

        public List<HouseholdUser> GetAllByHousehold(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, HouseholdId, UserId, UserTypeId, IsAccepted
                    FROM HouseholdUser
                    WHERE HouseholdId = @HouseholdId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);

                    var reader = cmd.ExecuteReader();

                    var householdUsers = new List<HouseholdUser>();

                    while (reader.Read())
                    {
                        var householdUser = new HouseholdUser()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            HouseholdId = DbUtils.GetInt(reader, "HouseholdId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            IsAccepted = DbUtils.GetBool(reader, "IsAccepted")
                        };
                        householdUsers.Add(householdUser);
                    }
                    return householdUsers;
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
