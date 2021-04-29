using GroSharies.Models;

namespace GroSharies.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseId(string firebaseId);
        void Add(User user);
    }
}