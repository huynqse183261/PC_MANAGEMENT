using BO.Models;
using Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{ 
    public class ProductService : IProductService
    {
        private readonly IProductRepo _productRepo;

        public ProductService()
        {
            _productRepo = new ProductRepo();
        }

        public async Task<List<Product>> GetProduct()
        {
            return await _productRepo.GetProduct();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _productRepo.GetProductById(id);
        }

        public async Task<bool> AddProduct(Product product)
        {
            return await _productRepo.AddProduct(product);
        }

       

        public async Task<bool> DeleteProduct(int id)
        {
            return await _productRepo.DeleteProduct(id);
        }

        public async Task<bool> UpdateProductById(int id, Product updatedProduct)
        {
            return await _productRepo.UpdateProductById(id, updatedProduct);
        }
    }
}
