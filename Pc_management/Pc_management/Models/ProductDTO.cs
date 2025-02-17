namespace Pc_management.Models
{
    public class ProductDTO
    {
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string? Description { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }

    }
}
