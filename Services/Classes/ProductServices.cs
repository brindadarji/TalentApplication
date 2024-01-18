using Microsoft.EntityFrameworkCore;
using TalentApplication.Models;
using TalentApplication.Services.Interfaces;
using TalentApplication.ViewModels.Product;

namespace TalentApplication.Services.Classes
{
    public class ProductServices: IProductServices
    {
        private readonly TalentDbContext _context;

        public ProductServices(TalentDbContext context) {
            _context = context;
        }

        public async Task<CreateProductResponse> CreateProduct(CreateProductRequest createProduct)
        {
            var product = new Product { Name = createProduct.Name, Price = createProduct.Price };
            _context.Add(product);
            await _context.SaveChangesAsync();
            return new CreateProductResponse { Id = product.Id, Name = product.Name, Price = product.Price };
        }

        public async Task DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ViewProductViewModel>> GetProducts()
        {
            return await _context.Products
                .Select(p => new ViewProductViewModel { Id = p.Id, Name = p.Name, Price = p.Price })
                .ToListAsync();
        }

        public async Task<UpdateProductResponse> UpdateProduct(int id, UpdateProductRequest updateProduct)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return new UpdateProductResponse();
            }

            product.Name = updateProduct.Name;
            product.Price = updateProduct.Price;

            _context.Products.Update(product); 
            await _context.SaveChangesAsync();
            return new UpdateProductResponse { Id = product.Id, Name = product.Name, Price = product.Price };
        }
    }
}
