import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteService } from '../../services/favorites.service';
import { addFavorite } from './favorite.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as FavoriteActions from './favorite.actions';

@Injectable({ providedIn: 'root' })
export class FavoriteEffect {
  private actions$ = inject(Actions);
  private _favoriteServie = inject(FavoriteService);

  $addFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.addFavorite),
      mergeMap(({ favorite }) => {
        return this._favoriteServie.saveFavorites(favorite).pipe(
          map((savedFavorite) => FavoriteActions.addFavoriteSucess({ favorite: savedFavorite })),
          catchError((error) => of(FavoriteActions.addFavoriteError({ error }))),
        );
      }),
    ),
  );
}
