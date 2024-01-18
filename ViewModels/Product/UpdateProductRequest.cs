using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Product
{
    public class UpdateProductRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }
    }
}
