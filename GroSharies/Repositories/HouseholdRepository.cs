using Microsoft.Extensions.Configuration;
using GroSharies.Models;
using GroSharies.Utils;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public class HouseholdRepository : BaseRepository, IHouseholdRepository
    {
        public HouseholdRepository(IConfiguration configuration) : base(configuration) { }

        public List<Household> GetAll(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT h.Id AS HouseholdId, h.Name as HouseholdName
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
                            Name = DbUtils.GetString(reader, "HouseholdName"),
                        };
                        userHouseholds.Add(household);
                    }
                    reader.Close();

                    return userHouseholds;
                }
            }
        }
    }
}
