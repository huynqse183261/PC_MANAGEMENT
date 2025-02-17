namespace Pc_management.Models
{
    public class OrderDTO
    {
        public int Accountid { get; set; }
        public decimal Totalprice { get; set; }
        public List<OrderDetailDTO> OrderDetails { get; set; } = new List<OrderDetailDTO>();
    }

    public class OrderDetailDTO
    {
        public int Productid { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}