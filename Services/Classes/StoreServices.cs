using Microsoft.EntityFrameworkCore;
using TalentApplication.Models;
using TalentApplication.Services.Interfaces;
using TalentApplication.ViewModels.Store;

namespace TalentApplication.Services.Classes
{
    public class StoreServices : IStoreServices
    {
        private readonly TalentDbContext _context;
        public StoreServices(TalentDbContext context) {
            _context = context;
        }

        public async Task<CreateStoreResponse> CreateStore(CreateStoreRequest createStore)
        {
            var store = new Store { Name = createStore.Name, Address = createStore.Address };
            _context.Add(store);
            await _context.SaveChangesAsync();
            return new CreateStoreResponse { Id = store.Id, Name = store.Name, Address = store.Address };
        }

        public async Task DeleteStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);

            if (store == null)
            {
                return;
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

        }

        public async Task<List<ViewStoreViewModel>> GetStores()
        {
            return await _context.Stores
               .Select(s => new ViewStoreViewModel { Id = s.Id, Name = s.Name, Address = s.Address })
               .ToListAsync();
        }

        public async Task<UpdateStoreResponse> UpdateStore(int id, UpdateStoreRequest updateStore)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                return new UpdateStoreResponse();
            }

            store.Name = updateStore.Name;
            store.Address = updateStore.Address;

            _context.Stores.Update(store);
            await _context.SaveChangesAsync();
            return new UpdateStoreResponse { Id = store.Id, Name = store.Name, Address = store.Address };
        }
    }
}
