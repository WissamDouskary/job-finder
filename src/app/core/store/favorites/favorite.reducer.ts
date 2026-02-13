import { createReducer, on } from "@ngrx/store";
import { FavoritesState } from "../../models/favorite.model";
import { addFavorite } from "./favorite.actions";
import * as FavoritesActions from './favorite.actions';

export const initFavorite: FavoritesState = {
    favorites: [],
    error: null
}

export const favoritesReducer = createReducer(
    initFavorite,
    on(FavoritesActions.addFavorite, (state) => ({
        ...state,
    })),

    on(FavoritesActions.addFavoriteSucess, (state, { favorite }) => {
        const alreadyExists = state.favorites.some(
            (fav) => fav.offerId === favorite.offerId && fav.userId === favorite.userId,
        );
        return {
            ...state,
            favorites: alreadyExists ? state.favorites : [...state.favorites, favorite],
            error: null,
        };
    }),

    on(FavoritesActions.addFavoriteError, (state, { error }) => ({
        ...state,
        error: error
    })),

    on(FavoritesActions.loadFavorites, (state) => ({
        ...state
    })),

    on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
        ...state,
        favorites
    })),

    on(FavoritesActions.loadFavoritesError, (state, { error }) => ({
        ...state,
        error
    })),

    on(FavoritesActions.removeFavorite, (state) => ({
        ...state,
    })),

    on(FavoritesActions.removeFavoriteSuccess, (state, { favoriteId }) => ({
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== favoriteId),
        error: null,
    })),

    on(FavoritesActions.removeFavoriteError, (state, { error }) => ({
        ...state,
        error,
    }))
)