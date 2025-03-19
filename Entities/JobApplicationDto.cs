using static JobApplicationTrackerAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace JobApplicationTrackerAPI.Entities
{
    public sealed class JobApplicationDto
    {
        public string CompanyName { get; set; } = String.Empty;
        public string Position { get; set; } = String.Empty;
        public JobApplicationStatusEnum Status { get; set; } // "Applied", "Interview", "Offer", "Rejected"
        public DateTime DateApplied { get; set; }
    }
}
