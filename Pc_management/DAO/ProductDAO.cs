using BO.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO
{
    public class ProductDAO
    {
        private Pc_managementContext _context;
        private static ProductDAO instance = null;

        public static ProductDAO Instance { 
            get
            {
                if (instance == null)
                {
                    instance = new ProductDAO();
                }
                return instance;
                    
            }
        }
        public ProductDAO()
        {
           _context = new Pc_managementContext() ;

        }
        public async Task<List<Product>> GetProduct()
        {
            return await _context.Products.ToListAsync();
        }
        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<bool> AddProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateProductById(int id, Product updatedProduct)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null) return false;

            // Update the existing product's properties with the new values
            existingProduct.Name = updatedProduct.Name;
            existingProduct.Price = updatedProduct.Price;
            existingProduct.Stock = updatedProduct.Stock;
            existingProduct.Description = updatedProduct.Description;
            existingProduct.Image = updatedProduct.Image;
            existingProduct.Category = updatedProduct.Category;
            // Add other properties as needed

            _context.Entry(existingProduct).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProduct(int id)
        {
            var product = await GetProductById(id);
            if (product == null) return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
