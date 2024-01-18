using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Store
{
    public class CreateStoreRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }
    }
}
