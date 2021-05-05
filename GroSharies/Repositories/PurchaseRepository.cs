using Microsoft.Extensions.Configuration;
using GroSharies.Models.DomainModels;
using GroSharies.Models.DataModels;
using GroSharies.Utils;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public class PurchaseRepository : BaseRepository, IPurchaseRepository
    {
        public PurchaseRepository(IConfiguration configuration) : base(configuration) { }

        public List<PurchaseDetail> GetAllById(int shoppingListId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT 
                    p.Id AS PurchaseId, ShoppingListId, UserId, Vendor, PurchaseDate, TotalCost, 
                    CONCAT(FirstName,' ', LastName) AS FullName
                    FROM Purchase p
                    JOIN [User] u on p.UserId = u.Id
                    WHERE ShoppingListId = @ShoppingListId";

                    DbUtils.AddParameter(cmd, "@ShoppingListId", shoppingListId);

                    var reader = cmd.ExecuteReader();

                    var purchases = new List<PurchaseDetail>();

                    while (reader.Read())
                    {
                        var purchaseDetail = new PurchaseDetail()
                        {
                            Purchase = new Purchase()
                            {
                                Id = DbUtils.GetInt(reader, "PurchaseId"),
                                ShoppingListId = DbUtils.GetInt(reader, "ShoppingListId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Vendor = DbUtils.GetString(reader, "Vendor"),
                                PurchaseDate = DbUtils.GetDateTime(reader, "PurchaseDate"),
                                TotalCost = DbUtils.GetDecimal(reader, "TotalCost")
                            },
                            Buyer = DbUtils.GetString(reader, "FullName")
                        };
                        purchases.Add(purchaseDetail);
                    }
                    reader.Close();
                    return purchases;
                }
            }
        }
    }
}
