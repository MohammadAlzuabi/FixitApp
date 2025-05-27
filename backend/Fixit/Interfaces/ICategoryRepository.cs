using Fixit.Models;

namespace Fixit.Interfaces
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<IEnumerable<Category>> GetCategoriesWithRelationsAsync();
    }
}
