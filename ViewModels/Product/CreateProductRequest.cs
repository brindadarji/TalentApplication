using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Product
{
    public class CreateProductRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }
    }
}
