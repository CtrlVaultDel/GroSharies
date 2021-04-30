using System;
using System.ComponentModel.DataAnnotations;

namespace GroSharies.Models.DataModels
{
    public class Purchase
    {
        public int Id { get; set; }

        [Required]
        public int ShoppingListId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Vendor { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public decimal TotalCost { get; set; }
    }
}
