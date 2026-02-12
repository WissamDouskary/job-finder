export interface Favorite {
  id?: string;
  userId: number;
  offerId: number;
  title: string;
  company: string;
  location: string;
}

export interface FavoritesState {
  favorites: Favorite[];
  error: any;
}