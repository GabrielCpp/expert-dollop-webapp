import { AsyncCursor } from "./cursor";

export type BuildUrlFn = (
  nextPageToken: string | undefined,
  limit: number
) => string;

interface PaginatedResult<T> {
  limit: number;
  nextPageToken: string;
  results: T[];
}

export class AsyncRestCursor<T> implements AsyncCursor<T[]> {
  private limit: number;
  private buildUrl: BuildUrlFn;
  private fetch: (url: string) => Promise<PaginatedResult<T>>;

  private _data: T[] = [];
  private nextPageToken: string | undefined = undefined;
  private hasNext: boolean = true;

  public constructor(
    fetch: (url: string) => Promise<PaginatedResult<T>>,
    limit: number,
    buildUrl: BuildUrlFn
  ) {
    this.fetch = fetch;
    this.limit = limit;
    this.buildUrl = buildUrl;
  }

  public async next(): Promise<boolean> {
    if (this.hasNext === false) {
      this._data = [];
      return false;
    }

    const result = await this.fetch(
      this.buildUrl(this.nextPageToken, this.limit)
    );
    const newData = result;
    const lastHasNext = this.hasNext;

    this.hasNext =
      newData.nextPageToken === undefined ||
      newData.results.length < newData.limit
        ? false
        : true;
    this.nextPageToken = newData.nextPageToken;
    this._data = newData.results;

    return lastHasNext;
  }

  public data(): T[] {
    return this._data || [];
  }
}
