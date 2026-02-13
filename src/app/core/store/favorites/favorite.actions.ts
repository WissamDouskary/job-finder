import { createAction, props } from '@ngrx/store';
import { Favorite } from '../../models/favorite.model';

export const addFavorite = createAction(
  '[Favorites] add to favorite',
  props<{ favorite: Favorite }>(),
);

export const addFavoriteSucess = createAction(
  '[Favorites] add to favorite success',
  props<{ favorite: Favorite }>(),
);

export const addFavoriteError = createAction(
  '[Favorites] add to favorite error',
  props<{ error: any }>(),
);

export const loadFavorites = createAction(
  '[Favorites] load favorites',
  props<{ id: string }>()
);

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: Favorite[] }>(),
);

export const loadFavoritesError = createAction(
  '[Favorites] Load Favorites Error',
  props<{ error: any }>(),
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ favoriteId: string }>(),
);

export const removeFavoriteSuccess = createAction(
  '[Favorites] Remove Favorite Success',
  props<{ favoriteId: string }>(),
);

export const removeFavoriteError = createAction(
  '[Favorites] Remove Favorite Error',
  props<{ error: any }>(),
);
