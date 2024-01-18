using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TalentApplication.Models;
using TalentApplication.Services.Interfaces;
using TalentApplication.ViewModels.Sales;

namespace TalentApplication.Services.Classes
{
    public class SaleServices : ISaleServices
    {
        private readonly TalentDbContext _context;

        public SaleServices(TalentDbContext context)
        {
            _context = context;
        }

        public async Task<CreateSaleResponse> CreateSale(CreateSaleRequest createSale)
        {
            var sale = new Sale { ProductId = createSale.ProductId, CustomerId = createSale.CustomerId, StoreId = createSale.StoreId, DateSold = createSale.DateSold };
            _context.Add(sale);
            await _context.SaveChangesAsync();

            _context.Entry(sale).Reference(s => s.Product).Load();
            _context.Entry(sale).Reference(s => s.Customer).Load();
            _context.Entry(sale).Reference(s => s.Store).Load();
             return new CreateSaleResponse { Id = sale.Id, ProductName = sale.Product.Name, CustomerName = sale.Customer.Name, StoreName = sale.Store.Name, DateSold = sale.DateSold };
        }

        public async Task DeleteSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);

            if (sale == null)
            {
                return;
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ViewSaleViewModel>> GetSales()
        {
            return await _context.Sales
            .Include(s => s.Customer)
            .Include(s => s.Product)
            .Select(s => new ViewSaleViewModel { Id = s.Id, CustomerId = s.CustomerId, ProductId = s.ProductId , StoreId = s.StoreId , CustomerName = s.Customer.Name, ProductName = s.Product.Name, StoreName= s.Store.Name, DateSold = s.DateSold })
            .ToListAsync();
        }

        public async Task<UpdateSaleResponse> UpdateSale(int id, UpdateSaleRequest updateSale)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return new UpdateSaleResponse();
            }

            sale.ProductId = updateSale.ProductId;
            sale.CustomerId = updateSale.CustomerId;
            sale.StoreId = updateSale.StoreId;
            sale.DateSold = updateSale.DateSold;

            _context.Sales.Update(sale);
            await _context.SaveChangesAsync();

            _context.Entry(sale).Reference(s => s.Product).Load();
            _context.Entry(sale).Reference(s => s.Customer).Load();
            _context.Entry(sale).Reference(s => s.Store).Load();
            return new UpdateSaleResponse { Id = sale.Id, CustomerName = sale.Customer.Name, ProductName = sale.Product.Name, StoreName = sale.Store.Name, DateSold = sale.DateSold };
        }
    }
}
