using BO.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pc_management.Models;
using Service;

namespace Pc_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetAllProduct")]
        public async Task<IActionResult> GetAllProduct()
        {
            var products = await _productService.GetProduct();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        
        [HttpPost("CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductDTO productDto)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is required.");
            }

            // Create a new Product object without setting Productid
            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Stock = productDto.Stock,
                Description = productDto.Description,
                Image = productDto.Image,
                Category = productDto.Category
            };

            var result = await _productService.AddProduct(product);
            if (!result)
            {
                return BadRequest("Product already exists.");
            }

            // Return the created product, which will now have a Productid assigned by the database
            return CreatedAtAction(nameof(GetProductById), new { id = product.Productid }, product);
        }

        [HttpPut("UpdateProductById/{id}")]
        public async Task<IActionResult> UpdateProductById(int id, [FromBody] ProductDTO productDto)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is required.");
            }

            // Create a Product object from ProductDTO
            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Stock = productDto.Stock,
                Description = productDto.Description,
                Image = productDto.Image,
                Category = productDto.Category
            };

            var result = await _productService.UpdateProductById(id,product);
            if (!result)
            {
                return NotFound("Product not found.");
            }

            return Ok(new { message = "Update successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productService.DeleteProduct(id);
            if (!result)
            {
                return NotFound("Product not found.");
            }

            return Ok(new { message = "Delete successfully" });
        }
    }
}
