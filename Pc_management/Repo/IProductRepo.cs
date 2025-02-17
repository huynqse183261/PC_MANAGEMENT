using BO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repo
{
    public interface IProductRepo
    {
        Task<List<Product>> GetProduct();
        Task<bool> DeleteProduct(int id);
        Task<bool> UpdateProductById(int id, Product updatedProduct);
        Task<bool> AddProduct(Product product);
        Task<Product> GetProductById(int id);
    }
}
