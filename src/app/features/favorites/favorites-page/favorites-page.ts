import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadFavorites } from '../../../core/store/favorites/favorite.actions';
import { userResponse } from '../../../core/models/user-response.model';
import { selectAllFavorites } from '../../../core/store/favorites/favorite.selectors';
import { AsyncPipe } from '@angular/common';
import { JobCardComponent } from '../../../shared/components/job-card/job-card';

@Component({
  selector: 'app-favorites-page',
  imports: [RouterLink, AsyncPipe, JobCardComponent],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
})
export class FavoritesPageComponent implements OnInit {
  private _store = inject(Store);
  private _router = inject(Router);
  public favorites$ = this._store.select(selectAllFavorites);

  ngOnInit(): void {
    this.loadFavorites()
  }

  loadFavorites() {
    const authUser: userResponse | string | null = localStorage.getItem('user');
    if (!authUser) return this._router.navigate(['/login']);
    const user: userResponse = JSON.parse(authUser);
    this._store.dispatch(loadFavorites({ id: user.id }));
    return;
  }
}
