using TalentApplication.ViewModels.Store;

namespace TalentApplication.Services.Interfaces
{
    public interface IStoreServices
    {
        Task<List<ViewStoreViewModel>> GetStores();
        Task<CreateStoreResponse> CreateStore(CreateStoreRequest createStore);
        Task<UpdateStoreResponse> UpdateStore(int id, UpdateStoreRequest updateStore);
        Task DeleteStore(int id);
    }
}
