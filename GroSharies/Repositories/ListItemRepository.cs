using Microsoft.Extensions.Configuration;
using GroSharies.Models.DataModels;
using GroSharies.Utils;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public class ListItemRepository : BaseRepository, IListItemRepository
    {
        public ListItemRepository(IConfiguration configuration) : base(configuration) { }

        public List<ListItem> GetAllById(int shoppingListId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, ShoppingListId, Name, IsChecked
                    FROM ListItem                     
                    WHERE ShoppingListId = @ShoppingListId";

                    DbUtils.AddParameter(cmd, "@ShoppingListId", shoppingListId);

                    var reader = cmd.ExecuteReader();

                    var listItems = new List<ListItem>();

                    while (reader.Read())
                    {
                        var listItem = new ListItem()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ShoppingListId = DbUtils.GetInt(reader, "ShoppingListId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            IsChecked = DbUtils.GetBool(reader, "IsChecked")
                        };
                        listItems.Add(listItem);
                    }
                    reader.Close();
                    return listItems;
                }
            }
        }
    }
}