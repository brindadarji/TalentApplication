using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Sales
{
    public class CreateSaleRequest
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int StoreId { get; set; }
        [Required]
        public DateTime DateSold { get; set; }
    }
}
