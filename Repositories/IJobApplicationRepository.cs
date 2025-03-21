using JobApplicationTrackerAPI.Entities;
using JobApplicationTrackerAPI.Models;

namespace JobApplicationTrackerAPI.Repositories
{
    public interface IJobApplicationRepository
    {
        Task<IEnumerable<JobApplication>> GetAllJobApplicationsAsync(int? pageNumber, int? pageSize);
        Task<JobApplication> GetJobApplicationByIdAsync(int id);
        Task<JobApplication> AddJobApplicationAsync(JobApplicationDto jobApplication);
        Task UpdateJobApplicationAsync(JobApplication jobApplication);
        Task DeleteJobApplicationAsync(int id);
    }
}
