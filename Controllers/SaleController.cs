using Microsoft.AspNetCore.Mvc;
using TalentApplication.Services;
using TalentApplication.Services.Interfaces;
using TalentApplication.ViewModels.Sales;

namespace TalentApplication.Controllers
{
    public class SaleController : Controller
    {
        private readonly ISaleServices _saleService;

        public SaleController(ISaleServices saleServices)
        {
            _saleService = saleServices;
        }

        [HttpGet]
        public async Task<IEnumerable<ViewSaleViewModel>> Get()
        {
            return await _saleService.GetSales();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSaleRequest createSaleViewModel)
        {
            if (createSaleViewModel == null)
            {
                return BadRequest("Invalid sale data");
            }

            var saleResponse = await _saleService.CreateSale(createSaleViewModel);
            return Ok(saleResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSaleRequest updateSaleViewModel)
        {
            if (updateSaleViewModel == null)
            {
                return BadRequest("Invalid sales data");
            }

            var saleupdateResponse = await _saleService.UpdateSale(id, updateSaleViewModel);
            return Ok(saleupdateResponse);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _saleService.DeleteSale(id);
            return Ok();
        }
    }
}
