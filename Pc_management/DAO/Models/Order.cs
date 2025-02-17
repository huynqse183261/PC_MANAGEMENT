using System;
using System.Collections.Generic;

namespace DAO.Models
{
    public partial class Order
    {
        public Order()
        {
            Orderdetails = new HashSet<Orderdetail>();
        }

        public int Orderid { get; set; }
        public int Accountid { get; set; }
        public DateTime? Orderdate { get; set; }
        public decimal Totalprice { get; set; }

        public virtual Account Account { get; set; } = null!;
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
