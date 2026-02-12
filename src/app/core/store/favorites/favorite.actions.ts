import { createAction, props } from "@ngrx/store";
import { Favorite } from "../../models/favorite.model";

export const addFavorite = createAction(
    "[Favorite] add to favorite",
    props<{favorite: Favorite}>()
)

export const addFavoriteSucess = createAction(
    "[Favorite] add to favorite success",
    props<{favorite: Favorite}>()
)

export const addFavoriteError = createAction(
    "[Favorite] add to favorite error",
    props<{error: any}>()
)