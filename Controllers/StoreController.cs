using Microsoft.AspNetCore.Mvc;
using TalentApplication.Services;
using TalentApplication.Services.Interfaces;
using TalentApplication.ViewModels.Store;

namespace TalentApplication.Controllers
{
    public class StoreController : Controller
    {
        private readonly IStoreServices _storeService;

        public StoreController(IStoreServices storeService)
        {
            _storeService = storeService;
        }

        [HttpGet]
        public async Task<IEnumerable<ViewStoreViewModel>> Get()
        {
            return await _storeService.GetStores();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStoreRequest createStoreViewModel)
        {
            if (createStoreViewModel == null)
            {
                return BadRequest("Invalid store data");
            }

            var storeResponse = await _storeService.CreateStore(createStoreViewModel);
            return Ok(storeResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateStoreRequest updateStoreViewModel)
        {
            if (updateStoreViewModel == null)
            {
                return BadRequest("Invalid store data");
            }

            var storeupdateResponse = await _storeService.UpdateStore(id, updateStoreViewModel);
            return Ok(storeupdateResponse);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _storeService.DeleteStore(id);
            return Ok();
        }

    }
}
