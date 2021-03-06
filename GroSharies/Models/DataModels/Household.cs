using System.ComponentModel.DataAnnotations;

namespace GroSharies.Models.DataModels
{
    public class Household
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
