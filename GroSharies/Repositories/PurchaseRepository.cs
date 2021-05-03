using Microsoft.Extensions.Configuration;
using GroSharies.Models.DataModels;
using GroSharies.Utils;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public class PurchaseRepository : BaseRepository, IPurchaseRepository
    {
        public PurchaseRepository(IConfiguration configuration) : base(configuration) { }

        public List<Purchase> GetAllById(int shoppingListId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, ShoppingListId, UserId, Vendor, PurchaseDate, TotalCost
                    FROM Purchase                     
                    WHERE ShoppingListId = @ShoppingListId";

                    DbUtils.AddParameter(cmd, "@ShoppingListId", shoppingListId);

                    var reader = cmd.ExecuteReader();

                    List<Purchase> purchases = null;

                    while (reader.Read())
                    {
                        var purchase = new Purchase()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ShoppingListId = DbUtils.GetInt(reader, "ShoppingListId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Vendor = DbUtils.GetString(reader, "Vendor"),
                            PurchaseDate = DbUtils.GetDateTime(reader, "PurchaseDate"),
                            TotalCost = DbUtils.GetDecimal(reader, "TotalCost")
                        };
                        purchases.Add(purchase);
                    }
                    reader.Close();
                    return purchases;
                }
            }
        }
    }
}
