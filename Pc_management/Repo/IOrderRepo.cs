using BO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repo
{
    public interface IOrderRepo
    {
        Task<List<Order>> GetAllOrderListAsnyc();
        Task<Order> GetOrderById(int id);
        Task<bool> CreateOrder(Order order);
        Task<bool> UpdateOrder(int id, Order order);
        Task<bool> DeleteOrder(int id);
    }
}
