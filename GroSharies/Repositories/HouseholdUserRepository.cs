using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using GroSharies.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

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

                    using (var reader = cmd.ExecuteReader())
                    {
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

                    }
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

                    using (var reader = cmd.ExecuteReader())
                    {
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

                    using (var reader = cmd.ExecuteReader())
                    {
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
                        return householdUser;
                    }
                }
            }
        }

        public List<UserDetail> GetUserDetailsByHousehold(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT 
                    hu.Id AS HouseholdUserId,
                    CONCAT(u.FirstName,' ', u.LastName) AS FullName,
                    ut.Name AS Role
                    FROM HouseholdUser hu
                    JOIN [User] u ON u.Id = hu.UserId
                    JOIN UserType ut ON ut.Id = hu.UserTypeId
                    WHERE hu.HouseholdId = @HouseholdId
                    ORDER BY ut.Id, u.FirstName";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        var userDetails = new List<UserDetail>();

                        while (reader.Read())
                        {
                            var userDetail = new UserDetail()
                            {
                                HouseholdUserId = DbUtils.GetInt(reader, "HouseholdUserId"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                UserType = DbUtils.GetString(reader, "Role")
                            };

                            userDetails.Add(userDetail);
                        }
                        return userDetails;
                    }
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

                    using (var reader = cmd.ExecuteReader())
                    {
                        var allHouseholdEmails = new List<string>();

                        while (reader.Read())
                        {
                            string email = DbUtils.GetString(reader, "Email");
                            allHouseholdEmails.Add(email);
                        }
                        return allHouseholdEmails;
                    }
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
                        VALUES (@HouseholdId, @UserId, 3, 0)";

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
                        SET IsAccepted = 1, UserTypeId = 3
                        WHERE HouseholdId = @HouseholdId AND UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeclineInviteOrLeave(int householdId, int userId)
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

        public void KickUser(int householdUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE HouseholdUser
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", householdUserId);

                    cmd.ExecuteNonQuery();
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

                    using (var reader = cmd.ExecuteReader())
                    {
                        int numUsers = 0;

                        if (reader.Read())
                        {
                            numUsers = DbUtils.GetInt(reader, "NumUsers");
                        }
                        return numUsers;
                    }
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

                    using (var reader = cmd.ExecuteReader())
                    {
                        int numLists = 0;

                        if (reader.Read())
                        {
                            numLists = DbUtils.GetInt(reader, "NumLists");
                        }

                        return numLists;
                    }
                }
            }
        }
    }
}