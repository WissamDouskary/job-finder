import { Component, inject, Input, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Favorite } from '../../../core/models/favorite.model';
import { userResponse } from '../../../core/models/user-response.model';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../../../core/store/favorites/favorite.actions';
import { toast } from 'ngx-sonner';
import { selectAllFavorites } from '../../../core/store/favorites/favorite.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCardComponent {
  private _router = inject(Router);
  private _store = inject(Store);

  @Input() id = 0;
  @Input() title = '';
  @Input() company = '';
  @Input() location = '';
  @Input() date = '';
  @Input() description = '';
  @Input() levels = '';
  @Input() isFavorite = false;

  formatDate(date: string) {
    const nDate = date.split('T')[0];
    return `${nDate}`;
  }

  addToFavorite(id: number) {
    const favorites$ = this._store.select(selectAllFavorites);
    const authUser = localStorage.getItem('user');
    if (!authUser) return this._router.navigate(['/login']);

    let user: userResponse;
    try {
      user = JSON.parse(authUser);
    } catch (e) {
      localStorage.removeItem('user');
      return this._router.navigate(['/login']);
    }

    const favoritePayload: Favorite = {
      userId: user.id,
      offerId: id,
      title: this.title,
      company: this.company,
      location: this.location,
    };

    favorites$.pipe(take(1)).subscribe((favorites) => {
      const existingFavorite = favorites.find(
        (fav) => fav.offerId === favoritePayload.offerId && fav.userId === favoritePayload.userId,
      );

      if (existingFavorite) {
        this._store.dispatch(removeFavorite({ favoriteId: existingFavorite.id! }));
        toast.success('Job removed from favorites');
        return;
      }

      this._store.dispatch(addFavorite({ favorite: favoritePayload }));
      toast.success('Job added to favorites');
      return;
    });
    return;
  }
}

