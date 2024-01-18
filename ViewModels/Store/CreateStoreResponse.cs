using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Store
{
    public class CreateStoreResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
