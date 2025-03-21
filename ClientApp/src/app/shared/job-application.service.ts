import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { JobApplication } from './job-application.model';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  public jobApplications: JobApplication[] = [];
  public jobApplicationForm: JobApplication = new JobApplication();
  public formSubmitted: boolean = false;
  public currentPage: number = 1;
  public readonly pageSize: number = 10;

  private url: string = `${environment.apiBaseUrl}/JobApplications`;

  constructor(private http: HttpClient) { }

  refreshList(pageNumber?: number, pageSize?: number) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber != null ? pageNumber.toString() : 'null')
      .set('pageSize', pageSize != null ? pageSize.toString() : 'null');

    this.http.get(this.url, { params })
      .subscribe({
        next: (res) => {
          this.jobApplications = res as JobApplication[];
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  getJobApplications = () =>
    this.http.get<JobApplication[]>(this.url);

  postJobApplication = () =>
    this.http.post(this.url, this.jobApplicationForm);

  putJobApplication = () =>
    this.http.put(`${this.url}/${this.jobApplicationForm.id}`, this.jobApplicationForm);

  deleteJobApplication = (id: number) =>
    this.http.delete(`${this.url}/${id}`);

  resetForm(form: NgForm) {
    form.form.reset();
    this.jobApplicationForm = new JobApplication();
    this.formSubmitted = false;
  }
}
