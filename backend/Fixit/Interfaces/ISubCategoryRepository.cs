using Fixit.Models;

namespace Fixit.Interfaces
{
    public interface ISubCategoryRepository : IRepository<SubCategory>
    {
        Task<IEnumerable<SubCategory>> GetSubCategoriesWithRelationsAsync();
        Task<bool> DeleteSubCategorySafeAsync(int id);
    }
}
