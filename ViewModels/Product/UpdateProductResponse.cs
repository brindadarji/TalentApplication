using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Product
{
    public class UpdateProductResponse
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
