import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteService } from '../../services/favorites.service';
import { addFavorite } from './favorite.actions';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import * as FavoriteActions from './favorite.actions';

@Injectable({ providedIn: 'root' })
export class FavoriteEffect {
  private actions$ = inject(Actions);
  private _favoriteService = inject(FavoriteService);

  $addFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.addFavorite),
      switchMap(({ favorite }) => {
        return this._favoriteService.getAllFavorites(favorite.userId).pipe(
          switchMap((existing) => {
            const alreadyExists = existing.some(
              (fav) => fav.offerId === favorite.offerId && fav.userId === favorite.userId,
            );
            if (alreadyExists) {
              return of(FavoriteActions.addFavoriteError({ error: 'Favorite already exists' }));
            }
            return this._favoriteService.saveFavorites(favorite).pipe(
              map((savedFavorite) => FavoriteActions.addFavoriteSucess({ favorite: savedFavorite })),
              catchError((error) => of(FavoriteActions.addFavoriteError({ error }))),
            );
          }),
          catchError((error) => of(FavoriteActions.addFavoriteError({ error }))),
        );
      }),
    ),
  );

  $loadFavorites = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.loadFavorites),
      mergeMap(({ id }) => {
        return this._favoriteService.getAllFavorites(id).pipe(
          map((favorites) => {
            return FavoriteActions.loadFavoritesSuccess({ favorites: favorites });
          }),
          catchError((error) => of(FavoriteActions.loadFavoritesError({ error }))),
        );
      }),
    ),
  );

  $removeFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.removeFavorite),
      mergeMap(({ favoriteId }) => {
        return this._favoriteService.deleteFavorite(favoriteId).pipe(
          map(() => FavoriteActions.removeFavoriteSuccess({ favoriteId })),
          catchError((error) => of(FavoriteActions.removeFavoriteError({ error }))),
        );
      }),
    ),
  );
}
