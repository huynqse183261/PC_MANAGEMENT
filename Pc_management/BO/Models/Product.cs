using System;
using System.Collections.Generic;

namespace BO.Models
{
    public partial class Product
    {
        public Product()
        {
            Orderdetails = new HashSet<Orderdetail>();
        }

        public int Productid { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string? Description { get; set; }
        public string Image { get; set; }   
        public string Category { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
