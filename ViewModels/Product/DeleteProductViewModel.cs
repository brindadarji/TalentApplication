using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Product
{
    public class DeleteProductViewModel
    {
        [Required]
        public int Id { get; set; }
    }
}
