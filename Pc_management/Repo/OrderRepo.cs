using BO.Models;
using DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repo
{
    public class OrderRepo : IOrderRepo
    {
        public async Task<List<Order>> GetAllOrderListAsnyc()
        {
            return await OrderDAO.Instance.GetAllOrderListAsnyc();
        }

        public async Task<Order> GetOrderById(int id)
        {
            return await OrderDAO.Instance.GetOrderById(id);
        }

        public async Task<bool> CreateOrder(Order order)
        {
            return await OrderDAO.Instance.CreateOrder(order);
        }

        public async Task<bool> UpdateOrder(int id, Order order)
        {
            return await OrderDAO.Instance.UpdateOrder(id, order);
        }

        public async Task<bool> DeleteOrder(int id)
        {
            return await OrderDAO.Instance.DeleteOrder(id);
        }
    }
}
