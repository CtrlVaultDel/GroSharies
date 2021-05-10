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

        public List<string> GetEmailsByHousehold(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT u.Email
                    FROM HouseholdUser hu
                    LEFT JOIN [User] u ON hu.UserId = u.Id
                    WHERE hu.HouseholdId = @HouseholdId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);

                    var reader = cmd.ExecuteReader();

                    var allHouseholdEmails = new List<string>();

                    while (reader.Read())
                    {
                        string email = DbUtils.GetString(reader, "Email");
                        allHouseholdEmails.Add(email);
                    }
                    reader.Close();
                    return allHouseholdEmails;
                }
            }
        }

        public int CountHouseholdUsers(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT HouseholdId,
                    COUNT(HouseholdId) AS NumUsers
                    FROM HouseholdUser
                    WHERE HouseholdId = @HouseholdUserId
                    GROUP BY HouseholdId";

                    DbUtils.AddParameter(cmd, "@HouseholdUserId", householdId);

                    var reader = cmd.ExecuteReader();

                    int numUsers = 0;

                    if (reader.Read())
                    {
                        numUsers = DbUtils.GetInt(reader, "NumUsers");
                    }

                    return numUsers;
                }
            }
        }

        public int CountHouseholdLists(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT HouseholdId,
                    COUNT(HouseholdId) AS NumLists
                    FROM ShoppingList
                    WHERE HouseholdId = @HouseholdUserId
                    GROUP BY HouseholdId";

                    DbUtils.AddParameter(cmd, "@HouseholdUserId", householdId);

                    var reader = cmd.ExecuteReader();

                    int numLists = 0;

                    if (reader.Read())
                    {
                        numLists = DbUtils.GetInt(reader, "NumLists");
                    }

                    return numLists;
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

        public void InviteMember(int householdId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO HouseholdUser (HouseholdId, UserId, UserTypeId, IsAccepted)
                        OUTPUT INSERTED.ID
                        VALUES (@HouseholdId, @UserId, 2, 0)";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AcceptInvite(int householdId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE HouseholdUser 
                        SET IsAccepted = 1
                        WHERE HouseholdId = @HouseholdId AND UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeclineInvite(int householdId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE HouseholdUser 
                        WHERE HouseholdId = @HouseholdId AND UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
