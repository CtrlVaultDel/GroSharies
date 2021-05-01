using Microsoft.Extensions.Configuration;
using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using GroSharies.Utils;
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

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var household = new Household()
                        {                          
                            Id = DbUtils.GetInt(reader, "HouseholdId"),
                            Name = DbUtils.GetString(reader, "HouseholdName")                                                     
                        };
                        userHouseholds.Add(household);
                    }
                    reader.Close();

                    return userHouseholds;
                }
            }
        }

        public HouseholdDetail GetById(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        h.Id AS HouseholdId, h.Name AS HouseholdName,
                        sl.Id AS ShoppingListId, sl.Name AS ShoppingListName, sl.DateCreated 
                        FROM Household h
                        LEFT JOIN ShoppingList sl ON h.Id = sl.HouseholdId
                        WHERE h.Id = @HouseholdId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);

                    var reader = cmd.ExecuteReader();

                    HouseholdDetail householdDetail = null;

                    while (reader.Read())
                    {
                        if (householdDetail == null)
                        {
                            householdDetail = new HouseholdDetail()
                            {
                                Household = new Household() 
                                {
                                    Id = DbUtils.GetInt(reader, "HouseholdId"),
                                    Name = DbUtils.GetString(reader, "HouseholdName")
                                },
                                ShoppingLists = new List<ShoppingList>()                     
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader,"ShoppingListId"))
                        {
                            var shoppingList = new ShoppingList()
                            {
                                Id = DbUtils.GetInt(reader, "ShoppingListId"),
                                Name = DbUtils.GetString(reader, "ShoppingListName"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                            };
                            householdDetail.ShoppingLists.Add(shoppingList);
                        }
                    }
                    reader.Close();
                    return householdDetail;
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
    }
}
