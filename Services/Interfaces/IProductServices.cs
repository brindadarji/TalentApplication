using TalentApplication.ViewModels.Product;

namespace TalentApplication.Services.Interfaces
{
    public interface IProductServices
    {
        Task<List<ViewProductViewModel>> GetProducts();
        Task<CreateProductResponse> CreateProduct(CreateProductRequest createProduct);
        Task<UpdateProductResponse> UpdateProduct(int id, UpdateProductRequest updateProduct);
        Task DeleteProduct(int id);
    }
}
