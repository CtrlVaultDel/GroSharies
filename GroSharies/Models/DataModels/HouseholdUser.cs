using System.ComponentModel.DataAnnotations;

namespace GroSharies.Models.DataModels
{
    public class HouseholdUser
    {
        public int Id { get; set; }

        [Required]
        public int HouseholdId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        [Required]
        public bool IsAccepted { get; set; }
    }
}
