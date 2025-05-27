namespace Fixit.Models
{
    public class SubCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
