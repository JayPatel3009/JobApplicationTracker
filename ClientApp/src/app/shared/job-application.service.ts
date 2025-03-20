import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { JobApplication } from './job-application.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private url: string = environment.apiBaseUrl +'/JobApplications'

  public jobApplications: JobApplication[] = [];

  public jobApplicationForm: JobApplication = new JobApplication();

  public formSubmitted: boolean = false;

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: (res) => {
          this.jobApplications = res as JobApplication[];
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  postJobApplication = () =>
    this.http.post(this.url, this.jobApplicationForm);

  putJobApplication = () =>
    this.http.put(this.url + '/' + this.jobApplicationForm.id, this.jobApplicationForm);

  deleteJobApplication = (id: number) =>
    this.http.delete(this.url + '/' + id);

  resetForm(form: NgForm) {
    form.form.reset();
    this.jobApplicationForm = new JobApplication();
    this.formSubmitted = false;
  }
}
