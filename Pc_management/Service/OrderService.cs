using BO.Models;
using Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepo iOrderRepo;
        public OrderService()
        {
            iOrderRepo = new OrderRepo();
        }
        public async Task<List<Order>> GetAllOrderListAsnyc()
        {
            return await iOrderRepo.GetAllOrderListAsnyc();
        }

        public async Task<Order> GetOrderById(int id)
        {
            return await iOrderRepo.GetOrderById(id);
        }

        public async Task<bool> CreateOrder(Order order)
        {
            return await iOrderRepo.CreateOrder(order);
        }

        public async Task<bool> UpdateOrder(int id, Order order)
        {
            return await iOrderRepo.UpdateOrder(id, order);
        }

        public async Task<bool> DeleteOrder(int id)
        {
            return await iOrderRepo.DeleteOrder(id);
        }
    }
}
