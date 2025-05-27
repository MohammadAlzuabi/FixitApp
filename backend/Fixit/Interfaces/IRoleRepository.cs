using Fixit.Models;

namespace Fixit.Interfaces
{
    public interface IRoleRepository : IRepository<Role>
    {
        Task<IEnumerable<Role>> GetRoleWithRelationsAsync();
    }
}
