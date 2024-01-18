using TalentApplication.Models;
using TalentApplication.ViewModels.Customer;

namespace TalentApplication.Services.Interfaces
{
    public interface ICustomerServices
    {
        Task<List<ViewCustomerViewModel>> GetCustomers();
        Task<CreateCustomerResponse> CreateCustomer(CreateCustomerRequest createCustomer);
        Task<UpdateCustomerResponse> UpdateCustomer(int id, UpdateCustomerRequest updateCustomer);
        Task DeleteCustomer(int id);
    }
}
