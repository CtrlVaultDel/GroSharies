using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IHouseholdRepository
    {
        List<Household> GetAllHouseholds(int userId);
        Household GetById(int householdId);
        void Add(Household household, int userId);
        void Update(Household household);
        void Delete(int householdId);
    }
}