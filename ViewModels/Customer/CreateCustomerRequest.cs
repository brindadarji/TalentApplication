﻿using System.ComponentModel.DataAnnotations;

namespace TalentApplication.ViewModels.Customer
{
    public class CreateCustomerRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }
    }
}
