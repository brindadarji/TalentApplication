using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Customer
{
    public class CreateCustomerResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
