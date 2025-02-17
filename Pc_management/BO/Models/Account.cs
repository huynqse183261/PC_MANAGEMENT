using System;
using System.Collections.Generic;

namespace BO.Models
{
    public partial class Account
    {
        public Account()
        {
            Orders = new HashSet<Order>();
        }

        public int Accountid { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Email { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public DateTime? Createdat { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
