using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Sales
{
    public class ViewSaleViewModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int StoreId { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        public string CustomerName { get; set; }
        [Required]
        public string StoreName { get; set; }
        [Required]
        public DateTime DateSold { get; set; }
    }
}
