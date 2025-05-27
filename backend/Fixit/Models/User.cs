using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fixit.Models
{
    public class User
    {

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? City { get; set; } = string.Empty;
        public string? State { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;

        public int RoleId { get; set; }
        public Role? Role { get; set; }

        public int? SubCategoryId { get; set; }
        public SubCategory? SubCategory { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PhoneNumber { get; set; }

    }
}
