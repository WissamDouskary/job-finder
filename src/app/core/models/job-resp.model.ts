import { job } from './job.model';

export interface jobResponse {
  page: number;
  page_count: number;
  items_per_page: number;
  total: number;
  results: job[];
}
