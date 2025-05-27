using Fixit.DAL;
using Fixit.Interfaces;
using Fixit.Models;
using Microsoft.EntityFrameworkCore;

namespace Fixit.Repository
{
    public class SubCategoryRepository :Repository<SubCategory>, ISubCategoryRepository
    {
        public readonly FixitDbContext _context;
        public SubCategoryRepository(FixitDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SubCategory>> GetSubCategoriesWithRelationsAsync()
        {
            return await _context.Subcategories
                .Include(sc => sc.Category)
                .ToListAsync();
        }

        public async Task<bool> DeleteSubCategorySafeAsync(int id)
        {
            var usersWithSubCategory = await _context.Users
               .Where(u => u.SubCategoryId == id)
               .ToListAsync();

            if (usersWithSubCategory.Any())
            {
                // Nollställ SubCategoryId (om det är nullable)
                foreach (var user in usersWithSubCategory)
                {
                    user.SubCategoryId = null; // SubCategoryId måste då vara int? i User-modellen
                }
                await _context.SaveChangesAsync();
            }

            var entity = await _context.Subcategories.FindAsync(id);
            if (entity == null)
                return false;

            _context.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
