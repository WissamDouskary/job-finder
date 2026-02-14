import { ChangeDetectorRef, Component, inject, Input, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Favorite } from '../../../core/models/favorite.model';
import { userResponse } from '../../../core/models/user-response.model';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../../../core/store/favorites/favorite.actions';
import { toast } from 'ngx-sonner';
import { selectAllFavorites } from '../../../core/store/favorites/favorite.selectors';
import { take } from 'rxjs';
import { SuiviService } from '../../../core/services/suivi.service';
import { Suivi } from '../../../core/models/suivi.model';
import { UserService } from '../../../core/services/users.service';

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
  private _suiviService = inject(SuiviService);
  private _userService = inject(UserService);
  private _cdr = inject(ChangeDetectorRef)

  @Input() id = 0;
  @Input() title = '';
  @Input() company = '';
  @Input() location = '';
  @Input() date = '';
  @Input() description = '';
  @Input() levels = '';
  @Input() isFavorite = false;
  @Input() isTracked = false;
  @Input() showTrackButton = true;

  formatDate(date: string) {
    const nDate = date.split('T')[0];
    return `${nDate}`;
  }

  addToFavorite(id: number) {
    const favorites$ = this._store.select(selectAllFavorites);
    const user = this._userService.getCurrentUser();
    if (!user) return this._router.navigate(['/login']);

    const favoritePayload: Favorite = {
      userId: user.id!,
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

  trackJob() {
    const user = this._userService.getCurrentUser();
    if (!user) return this._router.navigate(['/login']);

    const payload: Suivi = {
      userId: user.id!,
      offerId: this.id,
      title: this.title,
      company: this.company,
      location: this.location,
      status: 'en_attente',
      notes: '',
      dateAdded: new Date().toISOString(),
    };

    this._suiviService.getAllSuivis(user.id!).pipe(take(1)).subscribe((suivis) => {
      const exists = suivis.some(s => s.offerId === this.id && s.userId === user.id);
      if (exists) {
        toast.error('Vous suivez déjà cette candidature !');
        return;
      }
      this._suiviService.addSuivi(payload).subscribe({
        next: () => {
          this.isTracked = true;
          toast.success('Candidature ajoutée au suivi');
          this._cdr.detectChanges()
        },
        error: () => toast.error('Erreur lors de l\'ajout au suivi'),
      });
    });
    return;
  }
}

