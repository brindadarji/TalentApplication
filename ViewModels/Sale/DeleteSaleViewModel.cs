using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Sales
{
    public class DeleteSaleViewModel
    {
        [Required]
        public int Id { get; set; }
    }
}
