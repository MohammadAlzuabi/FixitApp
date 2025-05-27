using Fixit.DAL;
using Fixit.Interfaces;
using Fixit.Models;
using Microsoft.EntityFrameworkCore;

namespace Fixit.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly FixitDbContext _context;

        public UserRepository(FixitDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Set<User>().FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<IEnumerable<User>> GetUsersWithRelationsAsync()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Include(u => u.SubCategory)
                .ToListAsync();
        }
        public async Task<User?> LoginUserAsync(string email, string password)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.SubCategory)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return null;

            // Verifiera lösenordet med hash-funktionen
            if (user.Password != password)
                return null;

            return user;
        }

    }
}
