export interface Favorite {
  id?: string;
  userId: string;
  offerId: number;
  title: string;
  company: string;
  location: string;
}

export interface FavoritesState {
  favorites: Favorite[];
  error: any;
}