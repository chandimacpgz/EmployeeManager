using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using AuthorizationServer.Models;
using System.Configuration;

namespace AuthorizationServer.Logic
{
    // UNDONE: Missing .NET naming conventions
    // NOTE: Proper class name
    public class AuthenticateDatabaseConncetion
    {
        // UNDONE: Incorrect naming of variables
        string Connection = ConfigurationManager.ConnectionStrings["EntityFrameProjectContext"].ConnectionString;

        public bool Register(User user)
        {

            using (SqlConnection connection = new SqlConnection(Connection))
            {

                String id = Guid.NewGuid().ToString("N");
                SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[LogData] ([Id], [Name], [Password] ,[Role]) VALUES (@Id, @Name, @Password , 'Viewer')");
                cmd.Connection = connection;
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.Parameters.AddWithValue("@Name", user.Name);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                connection.Open();

                // NOTE: Can be written as return cmd.ExecuteNonQuery() > 0;

                return (cmd.ExecuteNonQuery() > 0);
            }
        }

        public User IsValid(User user)
        {
            using (SqlConnection connection = new SqlConnection(Connection))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM [dbo].[LogData] WHERE [Name] = @Name");
                cmd.Connection = connection;
                cmd.Parameters.AddWithValue("@Name", user.Name);
                connection.Open();

                user.Password = DecryptString.DecryptStringAES(user.Password);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    // Check is the reader has any rows at all before starting to read.
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            if (Hash.Verify(user.Password, null, reader[2].ToString()))
                            {
                                user.Id = reader[0].ToString();
                                user.Name = reader[1].ToString();
                                user.Password = reader[2].ToString();
                                user.Role = reader[3].ToString();
                            }
                        }
                        return user;
                    }
                    else
                    return user;   
                }
            }
        }

        public bool Update(User user)
        {
            using (SqlConnection connection = new SqlConnection(Connection))
            {
                SqlCommand cmd = new SqlCommand("UPDATE [dbo].[LogData] SET [Role] = @Role  WHERE [Id] = @Id");
                cmd.Connection = connection;
                cmd.Parameters.AddWithValue("@Id", user.Id);
                cmd.Parameters.AddWithValue("@Role", user.Role);
                connection.Open();
                return (cmd.ExecuteNonQuery() > 0);
            }
        }
    }
}

