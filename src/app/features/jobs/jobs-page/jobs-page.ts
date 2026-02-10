import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { JobCardComponent } from '../../../shared/components/job-card/job-card';
import { jobService } from '../../../core/services/jobs.service';
import { job } from '../../../core/models/job.model';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { jobResponse } from '../../../core/models/job-resp.model';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [JobCardComponent, NgIf],
  templateUrl: './jobs-page.html',
  styleUrl: './jobs-page.css',
})
export class JobsPageComponent implements OnInit {
  private _jobService = inject(jobService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  currentPage = signal(1);
  jobs = signal<jobResponse | null>(null);

  ngOnInit(): void {
    this._route.queryParamMap
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params) => {
        const page = Number(params.get('page')) || 1;
        const category = params.get('category') || undefined;
        const location = params.get('location') || undefined;
        this.loadJobs(page, category, location);
      });
  }

  private loadJobs(page: number, category?: string, location?: string) {
    this.currentPage.set(page);
    this._jobService.getAllJobs(page, category, location).subscribe({
      next: (resp) => this.jobs.set(resp),
      error: () => toast.error('Error retrieving jobs. Please try again later.'),
    });
  }

  goToPage(page: number) {
    const totalPages = this.jobs()?.page_count || 1;
    if (page < 1 || page > totalPages) return;

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }
}
