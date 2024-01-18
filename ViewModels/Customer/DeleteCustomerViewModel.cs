using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Customer
{
    public class DeleteCustomerViewModel
    {
        [Required]
        public int Id { get; set; }
    }
}
