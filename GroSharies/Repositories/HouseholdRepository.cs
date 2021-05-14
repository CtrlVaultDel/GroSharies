using GroSharies.Models.DataModels;
using GroSharies.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public class HouseholdRepository : BaseRepository, IHouseholdRepository
    {
        public HouseholdRepository(IConfiguration configuration) : base(configuration) { }

        public List<Household> GetAllHouseholds(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        h.Id AS HouseholdId, h.Name AS HouseholdName
                        FROM Household h
                        JOIN HouseholdUser hu ON h.Id = hu.HouseholdId
                        WHERE hu.UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var userHouseholds = new List<Household>();

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var household = new Household()
                            {
                                Id = DbUtils.GetInt(reader, "HouseholdId"),
                                Name = DbUtils.GetString(reader, "HouseholdName")
                            };
                            userHouseholds.Add(household);
                        }

                        return userHouseholds;
                    }

                }
            }
        }

        public Household GetById(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        Id, Name                    
                        FROM Household 
                        WHERE Id = @HouseholdId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        Household household = null;

                        if (reader.Read())
                        {                     
                            household = new Household()
                            {                         
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")                                              
                            }; 
                        }
                        return household;
                    }

                }
            }
        }

        public void Add(Household household, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Household (Name) 
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", household.Name);

                    household.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Household household)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Household
                        SET Name = @Name                                          
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", household.Id);
                    DbUtils.AddParameter(cmd, "@Name", household.Name);
                    
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                // Delete the specified Household row
                /*
                    Related Table rows deleted via cascading delete
                    1) HouseholdUser
                    2) ShoppingList
                    3) Purchase
                    4) ListItem
                 */
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE Household
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", householdId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
