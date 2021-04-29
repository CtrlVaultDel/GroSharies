using GroSharies.Models;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IHouseholdRepository
    {
        List<Household> GetAll(int userId);
    }
}