using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using TalentApplication.Models;
using TalentApplication.Services.Interfaces;
using TalentApplication.ViewModels.Customer;

namespace TalentApplication.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ICustomerServices _customerService;

        public CustomerController(ICustomerServices customerServices)
        {
            _customerService = customerServices;
        }

        [HttpGet]
        public async Task<IEnumerable<ViewCustomerViewModel>> Get()
        {           
            return await _customerService.GetCustomers();            
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCustomerRequest createCustomerViewModel)
        {
            if (createCustomerViewModel == null)
            {
                return BadRequest("Invalid customer data");
            }

            var customerResponse = await _customerService.CreateCustomer(createCustomerViewModel);
            return Ok(customerResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCustomerRequest updateCustomerViewModel)
        {
            if (updateCustomerViewModel == null)
            {
                return BadRequest("Invalid customer data");
            }

            var customerupdateResponse = await _customerService.UpdateCustomer(id, updateCustomerViewModel);
            return Ok(customerupdateResponse);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _customerService.DeleteCustomer(id);
            return Ok();
        }
    }
}
