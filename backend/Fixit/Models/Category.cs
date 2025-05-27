namespace Fixit.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();
    }
}
