using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;
using BO.Models;
using Pc_management.Models;
using DAO;

namespace Pc_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrderListAsnyc();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderById(id);
            if (order == null)
            {
                return NotFound("Order not found");
            }
            return Ok(order);
        }

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDTO orderDto)
        {
            if (orderDto == null)
            {
                return BadRequest("Order data is required");
            }

            var order = new Order
            {
                Accountid = orderDto.Accountid,
                Orderdate = DateTime.Now,
                Totalprice = orderDto.Totalprice,
                Orderdetails = orderDto.OrderDetails.Select(od => new Orderdetail
                {
                    Productid = od.Productid,
                    Quantity = od.Quantity,
                    Price = od.Price
                }).ToList()
            };

            var result = await _orderService.CreateOrder(order);
            if (!result)
            {
                return BadRequest("Failed to create order");
            }

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Orderid }, order);
        }

        [HttpPut("UpdateOrder/{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderDTO orderDto)
        {
            if (orderDto == null)
            {
                return BadRequest("Order data is required");
            }

            var order = new Order
            {
                Orderid = id,
                Accountid = orderDto.Accountid,
                Totalprice = orderDto.Totalprice,
                Orderdetails = orderDto.OrderDetails.Select(od => new Orderdetail
                {
                    Productid = od.Productid,
                    Quantity = od.Quantity,
                    Price = od.Price
                }).ToList()
            };

            var result = await _orderService.UpdateOrder(id, order);
            if (!result)
            {
                return NotFound("Order not found or update failed");
            }

            return Ok(new { message = "Order updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _orderService.DeleteOrder(id);
            if (!result)
            {
                return NotFound("Order not found");
            }

            return Ok(new { message = "Order deleted successfully" });
        }
    }
}
