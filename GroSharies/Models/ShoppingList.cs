using System;
using System.ComponentModel.DataAnnotations;

namespace GroSharies.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }

        [Required]
        public int HouseholdId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }
    }
}
