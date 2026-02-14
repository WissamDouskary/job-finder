import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadFavorites } from '../../../core/store/favorites/favorite.actions';
import { userResponse } from '../../../core/models/user-response.model';
import { selectAllFavorites } from '../../../core/store/favorites/favorite.selectors';
import { AsyncPipe } from '@angular/common';
import { JobCardComponent } from '../../../shared/components/job-card/job-card';
import { SuiviService } from '../../../core/services/suivi.service';
import { UserService } from '../../../core/services/users.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-favorites-page',
  imports: [RouterLink, AsyncPipe, JobCardComponent],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
})
export class FavoritesPageComponent implements OnInit {
  private _store = inject(Store);
  private _router = inject(Router);
  private _userService = inject(UserService);
  public favorites$ = this._store.select(selectAllFavorites);
  private _suiviService = inject(SuiviService);

  trackedIds = signal<number[]>([]);

  ngOnInit(): void {
    this.loadFavorites();
    const user = this._userService.getCurrentUser();
    if (user) {
      this.loadTrackedJobs(user.id!);
    }
  }

  loadFavorites() {
    const user = this._userService.getCurrentUser();
    if (!user) return this._router.navigate(['/login']);
    this._store.dispatch(loadFavorites({ id: user.id! }));
    return;
  }

  private loadTrackedJobs(userId: string) {
    this._suiviService.getAllSuivis(userId).subscribe({
      next: (suivis) => {
        this.trackedIds.set(suivis.map((s) => s.offerId));
      },
      error: () => toast.error('Error retrieving tracked jobs. Please try again later'),
    });
  }

  isTracked(offerId: number) {
    return this.trackedIds().includes(offerId);
  }
}
