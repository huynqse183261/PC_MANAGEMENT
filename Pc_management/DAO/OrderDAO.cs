using BO.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO
{
    public class OrderDAO
    {
        private Pc_managementContext _context;
        private static OrderDAO instance = null;

        public static OrderDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new OrderDAO();
                return instance;
            }
        }
        public OrderDAO()
        {
            _context = new Pc_managementContext();
        }
        public async Task<List<Order>> GetAllOrderListAsnyc()
        {
            return await _context.Orders
                .Include(o => o.Orderdetails)
                .Include(o => o.Account)
                .ToListAsync();
        }

        public async Task<Order> GetOrderById(int id)
        {
            return await _context.Orders
                .Include(o => o.Orderdetails)
                .Include(o => o.Account)
                .FirstOrDefaultAsync(o => o.Orderid == id);
        }

        public async Task<bool> CreateOrder(Order order)
        {
            try
            {
                await _context.Orders.AddAsync(order);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateOrder(int id, Order order)
        {
            try
            {
                var existingOrder = await GetOrderById(id);
                if (existingOrder == null) return false;

                // Update order details
                _context.Orderdetails.RemoveRange(existingOrder.Orderdetails);
                existingOrder.Orderdetails = order.Orderdetails;
                existingOrder.Totalprice = order.Totalprice;

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteOrder(int id)
        {
            try
            {
                var order = await GetOrderById(id);
                if (order == null) return false;

                _context.Orderdetails.RemoveRange(order.Orderdetails);
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
