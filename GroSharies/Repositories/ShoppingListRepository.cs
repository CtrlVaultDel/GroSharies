using Microsoft.Extensions.Configuration;
using GroSharies.Models.DataModels;
using GroSharies.Utils;
using System.Collections.Generic;
using System;

namespace GroSharies.Repositories
{
    public class ShoppingListRepository : BaseRepository, IShoppingListRepository
    {
        public ShoppingListRepository(IConfiguration configuration) : base(configuration) { }

        public List<ShoppingList> GetAllById(int householdId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, HouseholdId, [Name], DateCreated    
                        FROM ShoppingList                   
                        WHERE HouseholdId = @HouseholdId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);

                    var reader = cmd.ExecuteReader();

                    var shoppingLists = new List<ShoppingList>();

                    while (reader.Read())
                    {
                        var shoppingList = new ShoppingList()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            HouseholdId = DbUtils.GetInt(reader, "HouseholdId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                        };
                        shoppingLists.Add(shoppingList);
                    }

                    reader.Close();
                    return shoppingLists;
                }
            }
        }

        public ShoppingList GetById(int shoppingListId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        sl.Id, sl.HouseholdId, sl.Name, sl.DateCreated,     
                        FROM ShoppingList sl                      
                        WHERE sl.Id = @ShoppingListId";

                    DbUtils.AddParameter(cmd, "@ShoppingListId", shoppingListId);

                    var reader = cmd.ExecuteReader();

                    ShoppingList shoppingList = null;

                    if (reader.Read())
                    {
                        shoppingList = new ShoppingList()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            HouseholdId = DbUtils.GetInt(reader, "HouseholdId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                        };
                    }
                    reader.Close();
                    return shoppingList;
                }
            }
        }

        public void Add(ShoppingList shoppingList)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ShoppingList (HouseholdId, [Name], DateCreated) 
                        OUTPUT INSERTED.ID
                        VALUES (@HouseholdId, @Name, @DateCreated)";

                    DbUtils.AddParameter(cmd, "@HouseholdId", shoppingList.HouseholdId);
                    DbUtils.AddParameter(cmd, "@Name", shoppingList.Name);
                    DbUtils.AddParameter(cmd, "@DateCreated", DateTime.Now);

                    shoppingList.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
