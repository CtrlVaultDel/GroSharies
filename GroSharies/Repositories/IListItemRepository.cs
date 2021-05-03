using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IListItemRepository
    {
        List<ListItem> GetAllById(int shoppingListId);
    }
}