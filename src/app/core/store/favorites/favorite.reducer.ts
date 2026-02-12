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

    on(FavoritesActions.addFavoriteSucess, (state, {favorite}) => ({
        favorites: [...state.favorites, favorite],
        error: null
    })),

    on(FavoritesActions.addFavoriteError, (state, {error}) => ({
        ...state,
        favorites: [],
        error: error
    }))
)