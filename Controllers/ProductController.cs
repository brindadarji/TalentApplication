using Microsoft.AspNetCore.Mvc;
using TalentApplication.Services;
using TalentApplication.Models;
using System.Reflection.Metadata.Ecma335;
using TalentApplication.Services.Interfaces;
using TalentApplication.ViewModels.Product;

namespace TalentApplication.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductServices _productService;

        public ProductController(IProductServices productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IEnumerable<ViewProductViewModel>> Get()
        {
            return await _productService.GetProducts();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductRequest createProductViewModel)
        {
            if (createProductViewModel == null)
            {
                return BadRequest("Invalid product data");
            }

            var productResponse = await _productService.CreateProduct(createProductViewModel);
            return Ok(productResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateProductRequest updateProductViewModel)
        {
            if (updateProductViewModel == null)
            {
                return BadRequest("Invalid product data");
            }

            var productupdateResponse = await _productService.UpdateProduct(id, updateProductViewModel);
            return Ok(productupdateResponse);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteProduct(id);
            return Ok();
        }

    }
}
