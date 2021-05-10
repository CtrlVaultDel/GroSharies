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

        public List<PurchaseDetail> GetDetailsById(int shoppingListId)
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
                    WHERE ShoppingListId = @ShoppingListId
                    ORDER BY PurchaseDate";

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

        public List<Purchase> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT 
                    p.Id AS PurchaseId, ShoppingListId, UserId, Vendor, PurchaseDate, TotalCost 
                    FROM Purchase p
                    WHERE UserId = @UserId
                    ORDER BY PurchaseDate";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();

                    var purchases = new List<Purchase>();

                    while (reader.Read())
                    {
                        var purchase = new Purchase()
                        {                            
                            Id = DbUtils.GetInt(reader, "PurchaseId"),
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

        public void Add(Purchase purchase)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Purchase (ShoppingListId, UserId, Vendor, PurchaseDate, TotalCost) 
                        OUTPUT INSERTED.ID
                        VALUES (@ShoppingListId, @UserId, @Vendor, @PurchaseDate, @TotalCost)";

                    DbUtils.AddParameter(cmd, "@ShoppingListId", purchase.ShoppingListId);
                    DbUtils.AddParameter(cmd, "@UserId", purchase.UserId);
                    DbUtils.AddParameter(cmd, "@Vendor", purchase.Vendor);
                    DbUtils.AddParameter(cmd, "@PurchaseDate", purchase.PurchaseDate);
                    DbUtils.AddParameter(cmd, "@TotalCost", purchase.TotalCost);

                    purchase.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Purchase purchase)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Purchase
                        SET 
                            ShoppingListId = @ShoppingListId, 
                            UserId = @UserId, 
                            Vendor = @Vendor, 
                            PurchaseDate = @PurchaseDate, 
                            TotalCost = @TotalCost 
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", purchase.Id);
                    DbUtils.AddParameter(cmd, "@ShoppingListId", purchase.ShoppingListId);
                    DbUtils.AddParameter(cmd, "@UserId", purchase.UserId);
                    DbUtils.AddParameter(cmd, "@Vendor", purchase.Vendor);
                    DbUtils.AddParameter(cmd, "@PurchaseDate", purchase.PurchaseDate);
                    DbUtils.AddParameter(cmd, "@TotalCost", purchase.TotalCost);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int purchaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE Purchase
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", purchaseId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
