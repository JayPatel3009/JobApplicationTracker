using JobApplicationTrackerAPI.Entities;
using JobApplicationTrackerAPI.Models;
using JobApplicationTrackerAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace JobApplicationTrackerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public sealed class JobApplicationsController : ControllerBase
    {
        private readonly IJobApplicationRepository _jobApplicationRepository;

        public JobApplicationsController(IJobApplicationRepository jobApplicationRepository) =>
            _jobApplicationRepository = jobApplicationRepository;

        // GET api/JobApplications?pageNumber=1&pageSize=10
        [HttpGet]
        public async Task<IActionResult> GetAllJobApplicationsAsync([FromQuery] int? pageNumber, [FromQuery] int? pageSize) =>
            Ok(await _jobApplicationRepository.GetAllJobApplicationsAsync(pageNumber, pageSize));

        // GET api/JobApplications/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobApplication(int id)
        {
            var jobApplication = await _jobApplicationRepository.GetJobApplicationByIdAsync(id);
            if (jobApplication == null)
                return NotFound();

            return Ok(jobApplication);
        }

        // POST api/JobApplications
        [HttpPost]
        public async Task<IActionResult> CreateJobApplication([FromBody] JobApplicationDto jobApplication)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Capture the created entity
            var createdJobApplication = await _jobApplicationRepository.AddJobApplicationAsync(jobApplication);

            return CreatedAtAction(nameof(GetJobApplication), new { id = createdJobApplication.Id }, createdJobApplication);
        }

        // PUT api/JobApplications/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJobApplication(int id, [FromBody] JobApplication jobApplication)
        {
            if (id != jobApplication.Id)
                return BadRequest();

            await _jobApplicationRepository.UpdateJobApplicationAsync(jobApplication);
            return NoContent();
        }

        // DELETE api/JobApplications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobApplication(int id)
        {
            await _jobApplicationRepository.DeleteJobApplicationAsync(id);
            return NoContent();
        }
    }
}
