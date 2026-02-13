import { Component, inject, OnInit, signal, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { JobCardComponent } from '../../../shared/components/job-card/job-card';
import { jobService } from '../../../core/services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { jobResponse } from '../../../core/models/job-resp.model';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from '../../../core/store/favorites/favorite.selectors';
import { userResponse } from '../../../core/models/user-response.model';
import { loadFavorites } from '../../../core/store/favorites/favorite.actions';
import { map } from 'rxjs';
import { Favorite } from '../../../core/models/favorite.model';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [JobCardComponent, CommonModule, FormsModule],
  templateUrl: './jobs-page.html',
  styleUrl: './jobs-page.css',
})
export class JobsPageComponent implements OnInit {
  private _jobService = inject(jobService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _store = inject(Store);
  public $favorites = this._store.select(selectAllFavorites);

  currentPage = signal(1);

  searchTerm = '';
  allJobs = signal<jobResponse | null>(null);
  jobs = signal<jobResponse | null>(null);
  selectedCategory: string = 'non';
  selectedLocation: string = 'non';
  isFavorite = signal<boolean>(false);

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page')) || 1;
      const category = params.get('category') || undefined;
      const location = params.get('location') || undefined;
      this.loadJobs(page, category, location);
      console.log(this.allJobs()?.results);
    });
    const authUser = localStorage.getItem('user');
    if (authUser) {
      const user: userResponse = JSON.parse(authUser);
      this._store.dispatch(loadFavorites({ id: user.id }));
    }
  }

  private loadJobs(page: number, category?: string, location?: string) {
    this.currentPage.set(page);
    this._jobService.getAllJobs(page, category, location).subscribe({
      next: (resp) => {
        this.jobs.set(resp);
        this.allJobs.set(resp);
      },
      error: () => toast.error('Error retrieving jobs. Please try again later'),
    });
  }

  filterByLocation(e: Event) {
    const filterTerm = (e.target as HTMLInputElement)?.value;
    if (filterTerm === 'non') {
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: { location: null },
        queryParamsHandling: 'merge',
      });
      return;
    }

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { location: filterTerm },
      queryParamsHandling: 'merge',
    });
  }

  filterByCategory(e: Event) {
    const filterTerm = (e.target as HTMLInputElement)?.value;

    if (filterTerm === 'non') {
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: { category: null },
        queryParamsHandling: 'merge',
      });
      return;
    }

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { category: filterTerm },
      queryParamsHandling: 'merge',
    });
  }

  resetFilters() {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        location: null,
        category: null,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });

    this.searchTerm = '';
    this.selectedCategory = 'non';
    this.selectedLocation = 'non';
  }

  onSearch() {
    const source = this.allJobs();
    if (!source) return;
    const term = this.searchTerm.toLowerCase();
    const filtred = source.results.filter((j) => j.name.toLowerCase().includes(term));
    this.jobs.set({ ...source, results: filtred, page_count: filtred.length });
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

  isFavorite$(offerId: number) {
    return this.$favorites.pipe(
      map((favs) => favs.some((f) => f.offerId === offerId)),
    );
  }
}
