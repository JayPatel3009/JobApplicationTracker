using JobApplicationTrackerAPI.Data;
using JobApplicationTrackerAPI.Entities;
using JobApplicationTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTrackerAPI.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly JobApplicationDbContext _dbContext;

        public JobApplicationRepository(JobApplicationDbContext dbContext) =>
            _dbContext = dbContext;

        public async Task<IEnumerable<JobApplication>> GetAllJobApplicationsAsync(int? pageNumber = null, int? pageSize = null)
        {
            IQueryable<JobApplication> query = _dbContext.JobApplications
                .OrderBy(jobApplication => jobApplication.Id);

            if (pageNumber.HasValue && pageSize.HasValue)
                query = query
                    .Skip((pageNumber.Value - 1) * pageSize.Value)
                    .Take(pageSize.Value);

            return await query.ToArrayAsync();
        }

        public async Task<JobApplication> GetJobApplicationByIdAsync(int id) =>
            await _dbContext.JobApplications.FindAsync(id);


        public async Task<JobApplication> AddJobApplicationAsync(JobApplicationDto jobApplication)
        {
            JobApplication jobApplicationEntity = new()
            {
                CompanyName = jobApplication.CompanyName,
                Position = jobApplication.Position,
                Status = jobApplication.Status,
                DateApplied = jobApplication.DateApplied,
            };

            _dbContext.JobApplications.Add(jobApplicationEntity);
            await _dbContext.SaveChangesAsync();

            // Return the newly created job application entity which now has an Id
            return jobApplicationEntity;
        }

        public async Task UpdateJobApplicationAsync(JobApplication jobApplication)
        {
            _dbContext.JobApplications.Update(jobApplication);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteJobApplicationAsync(int id)
        {
            var jobApplication = await GetJobApplicationByIdAsync(id);
            if (jobApplication != null)
                _dbContext.JobApplications.Remove(jobApplication);

            await _dbContext.SaveChangesAsync();
        }
    }
}
