using BO.Models;
using DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repo
{
    public class ProductRepo : IProductRepo
    {
        public async Task<List<Product>> GetProduct()
        {
            return await ProductDAO.Instance.GetProduct();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await ProductDAO.Instance.GetProductById(id);
        }

        public async Task<bool> AddProduct(Product product)
        {
            return await ProductDAO.Instance.AddProduct(product);
        }

        public async Task<bool> DeleteProduct(int id)
        {
            return await ProductDAO.Instance.DeleteProduct(id);
        }

        public async Task<bool> UpdateProductById(int id, Product updatedProduct)
        {
            return await ProductDAO.Instance.UpdateProductById(id, updatedProduct);
        }
    }
}
