using TalentApplication.ViewModels.Sales;

namespace TalentApplication.Services.Interfaces
{
    public interface ISaleServices
    {
        Task<List<ViewSaleViewModel>> GetSales();
        Task<CreateSaleResponse> CreateSale(CreateSaleRequest createSale);
        Task<UpdateSaleResponse> UpdateSale(int id, UpdateSaleRequest updateSale);
        Task DeleteSale(int id);
    }
}
