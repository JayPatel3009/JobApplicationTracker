using System.ComponentModel.DataAnnotations;
using static JobApplicationTrackerAPI.Enums;

namespace JobApplicationTrackerAPI.Entities
{
    public sealed class JobApplicationDto
    {
        [Required]
        [StringLength(50)]
        public string CompanyName { get; set; } = String.Empty;
        [Required]
        [StringLength(50)]
        public string Position { get; set; } = String.Empty;
        [Required]
        public JobApplicationStatusEnum Status { get; set; } // "Applied", "Interview", "Offer", "Rejected"
        [Required]
        public DateTime DateApplied { get; set; }
    }
}
