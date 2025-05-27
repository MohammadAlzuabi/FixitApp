using Fixit.Models;
using Microsoft.EntityFrameworkCore;

namespace Fixit.DAL
{
    public class FixitDbContext : DbContext
    {
        public FixitDbContext(DbContextOptions<FixitDbContext> options)
            : base(options)
        {
        }

        // Dina DbSet<...> properties här, t.ex:
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<SubCategory> Subcategories { get; set; }
    }
}
