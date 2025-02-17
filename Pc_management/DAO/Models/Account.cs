using System;
using System.Collections.Generic;

namespace DAO.Models
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
        public int Role { get; set; }
        public DateTime? Createdat { get; set; }
        public string Email { get; set; } = null!;

        public virtual ICollection<Order> Orders { get; set; }
    }
}
