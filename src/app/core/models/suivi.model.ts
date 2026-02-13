export type SuiviStatus = 'en_attente' | 'accepte' | 'refuse';

export interface Suivi {
  id?: string;
  userId: string;
  offerId: number;
  title: string;
  company: string;
  location: string;
  status: SuiviStatus;
  notes: string;
  dateAdded: string;
}
