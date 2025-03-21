import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from '../../shared/job-application.service';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { JobApplicationStatus } from '../../shared/enums';

@Component({
  selector: 'app-job-application-form',
  standalone: false,
  templateUrl: './job-application-form.component.html',
  styleUrl: './job-application-form.component.css'
})
export class JobApplicationFormComponent implements OnInit {

  jobApplicationStatus: string[] = [];

  constructor(
    public jobApplicationService: JobApplicationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.jobApplicationStatus = Object.values(JobApplicationStatus);
  }

  public onSubmit(form: NgForm) {
    this.jobApplicationService.formSubmitted = true;

    if (form.valid) {
        this.jobApplicationService.jobApplicationForm.id === 0
          ? this.insertJobApplication(form)
          : this.updateJobApplication(form);
    }
  }

  insertJobApplication(form: NgForm) {
    this.jobApplicationService.postJobApplication().pipe(take(1)).subscribe({
      next: () => {
        this.jobApplicationService.refreshList();
        this.jobApplicationService.resetForm(form);
        this.toastr.success('Submitted successfully', 'Job Application');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateJobApplication(form: NgForm) {
    this.jobApplicationService.putJobApplication().pipe(take(1)).subscribe({
      next: () => {
        this.jobApplicationService.refreshList();
        this.jobApplicationService.resetForm(form);
        this.toastr.info('Updated successfully', 'Job Application');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
