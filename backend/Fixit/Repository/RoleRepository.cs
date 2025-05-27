using Fixit.DAL;
using Fixit.Interfaces;
using Fixit.Models;
using Microsoft.EntityFrameworkCore;

namespace Fixit.Repository
{

    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        public readonly FixitDbContext _context;
        public RoleRepository(FixitDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Role>> GetRoleWithRelationsAsync()
        {
            return await _context.Roles
                .Include(r => r.Users)
                .ToListAsync();
        }

    }
}
