using GroSharies.Models.DataModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseId(string firebaseId);
        List<string> GetAllEmails();
        int GetUserIdByEmail(string email);
        void Add(User user);
    }
}