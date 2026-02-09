import { Component, inject, OnInit, signal } from '@angular/core';
import { JobCardComponent } from '../../../shared/components/job-card/job-card';
import { jobService } from '../../../core/services/jobs.service';
import { job } from '../../../core/models/job.model';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { toast } from 'ngx-sonner';
import { jobResponse } from '../../../core/models/job-resp.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-jobs-page',
  imports: [JobCardComponent],
  templateUrl: './jobs-page.html',
  styleUrl: './jobs-page.css',
})
export class JobsPageComponent implements OnInit {
  private _jobService = inject(jobService);
  private _route = inject(ActivatedRoute);

  jobs = signal<jobResponse>(
    {
      page: 0,
      page_count: 0,
      items_per_page: 0,
      total: 0,
      results: [
        {
          id: '',
          name: '',
          contents: '',
          publication_date: '',
          locations: [
            {
              name: '',
            },
          ],
          categories: [
            {
              name: '',
            },
          ],
          levels: [
            {
              name: '',
            },
          ],
          company: {
            name: '',
          },
          refs: {
            landing_page: '',
          },
        },
      ],
    },
  );

  loadJobs() {
    this._route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page')) || 1;
      const category = params.get('category') || undefined;
      const location = params.get('location') || undefined;

      this._jobService.getAllJobs(page, category, location).subscribe({
        next: (resp: jobResponse) => {
            this.jobs.set(resp);
            console.log(this.jobs());
        },
        error: () => {
            toast.error("error while retrieving jobs, please try again later");
        }
      });
    });
  }

  ngOnInit(): void {
    this.loadJobs();
  }
}
