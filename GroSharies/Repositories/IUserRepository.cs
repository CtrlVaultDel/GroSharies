using GroSharies.Models.DataModels;

namespace GroSharies.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseId(string firebaseId);
        void Add(User user);
    }
}