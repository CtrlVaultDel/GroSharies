using System.ComponentModel.DataAnnotations;

namespace GroSharies.Models.DataModels
{
    public class ListItem
    {
        public int Id { get; set; }

        [Required]
        public int ShoppingListId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public bool IsChecked { get; set; }
    }
}
