import { Url } from "url";

export class PaginatedApiResponse<T> {
  count: number;
  pages: number;
  previous?: string;
  next?: string;
  results: Array<T>;
}
