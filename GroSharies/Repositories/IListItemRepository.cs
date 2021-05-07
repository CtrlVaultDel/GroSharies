using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IListItemRepository
    {
        List<ListItem> GetAllById(int shoppingListId);
        void Toggle(ListItem listItem);
        void Add(ListItem listItem);
        void Update(ListItem listItem);
        void Delete(int listItem);
    }
}