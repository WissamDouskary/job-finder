import { Component, inject, Input, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Favorite } from '../../../core/models/favorite.model';
import { userResponse } from '../../../core/models/user-response.model';
import { Store } from '@ngrx/store';
import { addFavorite } from '../../../core/store/favorites/favorite.actions';
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

  @Input() id = '';
  @Input() title = '';
  @Input() company = '';
  @Input() location = '';
  @Input() date = '';
  @Input() description = '';
  @Input() levels = '';

  formatDate(date: string) {
    const nDate = date.split('T')[0];
    return `${nDate}`;
  }

  addToFavorite(id: string) {
    const favorites$ = this._store.select(selectAllFavorites);
    const authUser: userResponse | string | null = localStorage.getItem('user');
    if (!authUser) return this._router.navigate(['/login']);

    const user: userResponse = JSON.parse(authUser);

    const favoritePayload: Favorite = {
      userId: Number(user.id),
      offerId: Number(id),
      title: this.title,
      company: this.company,
      location: this.location,
    };

    favorites$.pipe(take(1)).subscribe((favorites) => {
      const isAlreadyExist = favorites.some(
        (fav) => fav.offerId === favoritePayload.offerId && fav.userId === favoritePayload.userId,
      );

      if (isAlreadyExist) {
        toast.error("you've already add this job into ur favorites!");
        return
      }

      this._store.dispatch(addFavorite({ favorite: favoritePayload }));
      toast.success('job added to favorites');
    });
    return;
  }
}
