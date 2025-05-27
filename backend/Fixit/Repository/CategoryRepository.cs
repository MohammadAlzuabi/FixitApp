using Fixit.DAL;
using Fixit.Interfaces;
using Fixit.Models;
using Microsoft.EntityFrameworkCore;

namespace Fixit.Repository
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly FixitDbContext _context;
        public CategoryRepository(FixitDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Category>> GetCategoriesWithRelationsAsync()
        {
            return await _context.Categories
                .Include(c => c.SubCategories)
                .ToListAsync();
        }

    }
}
