﻿using Microsoft.Extensions.Configuration;
using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using GroSharies.Utils;
using System.Collections.Generic;

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
                        SELECT 
                        sl.Id, sl.HouseholdId, sl.Name, sl.DateCreated,     
                        FROM ShoppingList sl                      
                        WHERE sl.HouseholdId = @HouseholdId";

                    DbUtils.AddParameter(cmd, "@HouseholdId", householdId);

                    var reader = cmd.ExecuteReader();

                    List<ShoppingList> shoppingLists = null;

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
    }
}
