using Microsoft.Extensions.Configuration;
using GroSharies.Models.DataModels;
using GroSharies.Utils;
using System.Collections.Generic;
using GroSharies.Models.DomainModels;

namespace GroSharies.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseId, Email, FirstName, LastName
                        FROM [User]                    
                        WHERE FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public List<string> GetAllEmails()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Email FROM [User]";

                    var reader = cmd.ExecuteReader();
                    var emails = new List<string>();

                    while (reader.Read())
                    {
                        string email = DbUtils.GetString(reader, "Email");
                        emails.Add(email);
                    }

                    return emails;
                }
            }
        }

        public int GetUserIdByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id FROM [User] WHERE Email= @Email";

                    DbUtils.AddParameter(cmd, "@Email", email);

                    var reader = cmd.ExecuteReader();
                    int userId = 0;

                    if (reader.Read())
                    {
                        userId = DbUtils.GetInt(reader, "Id");
                    }
                    reader.Close();
                    return userId;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FirebaseId, Email, FirstName, LastName)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseId, @Email, @FirstName, @LastName)";

                    DbUtils.AddParameter(cmd, "@FirebaseId", user.FirebaseId);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
