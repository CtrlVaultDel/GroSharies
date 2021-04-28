using GroSharies.Models;

namespace GroSharies.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        User GetByFirebaseId(string firebaseId);
    }
}