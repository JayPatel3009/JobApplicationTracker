import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { JobApplicationService } from '../shared/job-application.service';
import { JobApplication } from '../shared/job-application.model';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JobApplicationFormComponent } from './job-application-form/job-application-form.component';
import { take } from 'rxjs';

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
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.jobApplicationService.refreshList();
  }

  openCreateDialog(): void {
    const dialogConfig: MatDialogConfig = {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: { isNew: true }
    };
    this.openDialogAndRefresh(dialogConfig);
  }

  openEditDialog(jobApplication: JobApplication): void {
    this.populateForm(jobApplication);
    const dialogConfig: MatDialogConfig = {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: jobApplication
    };
    this.openDialogAndRefresh(dialogConfig);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure to delete this record?'))
      return;

    this.jobApplicationService.deleteJobApplication(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.jobApplicationService.refreshList();
        this.toastr.error('Deleted successfully', 'Job Application');
      },
      error: (err: any) => {
        console.error('Error deleting job application:', err);
      }
    });
  }

  private openDialogAndRefresh(config: MatDialogConfig): void {
    const dialogRef = this.dialog.open(JobApplicationFormComponent, config);
    dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
      this.jobApplicationService.refreshList();
    });
  }

  private populateForm(selectedRecord: JobApplication) {
    this.jobApplicationService.jobApplicationForm = Object.assign({}, selectedRecord);
  }
}
