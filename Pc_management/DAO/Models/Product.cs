using System;
using System.Collections.Generic;

namespace DAO.Models
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

        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
