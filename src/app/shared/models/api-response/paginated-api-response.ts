import { Url } from "url";

export class PaginatedApiResponse<T> {
  count: number;
  pages: number;
  previous?: Url;
  next?: Url;
  results: Array<T>;
}
