using System.ComponentModel.DataAnnotations;
using static JobApplicationTrackerAPI.Enums;

namespace JobApplicationTrackerAPI.Models
{
    public class JobApplication
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string CompanyName { get; set; } = String.Empty;
        [Required]
        public string Position { get; set; } = String.Empty;
        [Required]
        public JobApplicationStatusEnum Status { get; set; } // "Applied", "Interview", "Offer", "Rejected"
        [Required]
        public DateTime DateApplied { get; set; }
    }
}
