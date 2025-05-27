using Fixit.Models;

namespace Fixit.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task<IEnumerable<User>> GetUsersWithRelationsAsync();
        Task<User?> LoginUserAsync(string email, string password);

    }
}
