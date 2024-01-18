using TalentApplication.Services.Interfaces;
using TalentApplication.Models;
using TalentApplication.ViewModels.Customer;
using Microsoft.EntityFrameworkCore;

namespace TalentApplication.Services
{
    public class CustomerServices : ICustomerServices
    {
        private readonly TalentDbContext _context;

        public CustomerServices(TalentDbContext context)
        {
            _context = context;
        }

        public async Task<CreateCustomerResponse> CreateCustomer(CreateCustomerRequest createCustomer)
        {
            var customer = new Customer { Name = createCustomer.Name, Address = createCustomer.Address };
            _context.Add(customer);
            await _context.SaveChangesAsync();
            return new CreateCustomerResponse { Id = customer.Id, Name = customer.Name, Address = customer.Address  };
        }

        public async Task DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return;
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ViewCustomerViewModel>> GetCustomers()
        {
            return await _context.Customers
                .Select(c => new ViewCustomerViewModel { Id = c.Id, Name = c.Name, Address = c.Address })
                .ToListAsync();
        }

        public async Task<UpdateCustomerResponse> UpdateCustomer(int id, UpdateCustomerRequest updateCustomer)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return new UpdateCustomerResponse();
            }

            customer.Name = updateCustomer.Name;
            customer.Address = updateCustomer.Address;

            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();
            return new UpdateCustomerResponse { Id = customer.Id, Name = customer.Name, Address = customer.Address };
        }
    }
}
