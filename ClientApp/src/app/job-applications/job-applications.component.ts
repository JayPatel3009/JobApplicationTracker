import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { JobApplicationService } from '../shared/job-application.service';
import { JobApplication } from '../shared/job-application.model';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-job-applications',
  standalone: false,
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  constructor(
    public jobApplicationService: JobApplicationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.jobApplicationService.refreshList();
  }

  populateForm(selectedRecord: JobApplication) {
    this.jobApplicationService.jobApplicationForm = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.jobApplicationService.deleteJobApplication(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.jobApplicationService.refreshList();
          this.toastr.error('Deleted successfully', 'Job Application');
        },
        error: (err) => {
          console.log(err);
        }
      });

    this.jobApplicationService.refreshList();
  }
}
