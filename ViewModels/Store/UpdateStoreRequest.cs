using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Store
{
    public class UpdateStoreRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }
    }
}
