import { Component, Inject, OnInit } from '@angular/core';
import { JobApplicationService } from '../../shared/job-application.service';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { JobApplicationStatus } from '../../shared/enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobApplication } from '../../shared/job-application.model';

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
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<JobApplicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.jobApplicationStatus = Object.values(JobApplicationStatus);
    this.initializeFormData();
  }

  private initializeFormData(): void {
    if (this.data && this.data.isNew) {
      this.jobApplicationService.jobApplicationForm = new JobApplication();
    } else if (this.data) {
      this.jobApplicationService.jobApplicationForm = { ...this.data };
    }
  }

  public onSubmit(form: NgForm) {
    this.jobApplicationService.formSubmitted = true;

    if (form.valid) {
      const isNewRecord = this.jobApplicationService.jobApplicationForm.id === 0;
      const submissionObservable = isNewRecord 
        ? this.jobApplicationService.postJobApplication() 
        : this.jobApplicationService.putJobApplication();

      const toastMessage = isNewRecord ? 'Submitted successfully' : 'Updated successfully';
      const toastType = isNewRecord ? 'success' : 'info';

      this.handleSubmissionResponse(form, submissionObservable, toastMessage, toastType);
    }
  }

  private handleSubmissionResponse(form: NgForm, observable: any, toastMessage: string, toastType: 'success' | 'info'): void {
    observable.pipe(take(1)).subscribe({
      next: () => {
        this.jobApplicationService.refreshList();
        this.jobApplicationService.resetForm(form);
        if (toastType === 'success') {
          this.toastr.success(toastMessage, 'Job Application');
        } else {
          this.toastr.info(toastMessage, 'Job Application');
        }
        this.dialogRef.close();
      },
      error: (err: any) => {
        console.error('Error submitting job application:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
