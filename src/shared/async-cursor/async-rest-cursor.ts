import { AxiosInstance } from "axios";
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
  private readonly axios: AxiosInstance;
  private limit: number;
  private buildUrl: BuildUrlFn;

  private _data: T[] = [];
  private nextPageToken: string | undefined = undefined;
  private hasNext: boolean = true;

  public constructor(
    axios: AxiosInstance,
    limit: number,
    buildUrl: BuildUrlFn
  ) {
    this.axios = axios;
    this.limit = limit;
    this.buildUrl = buildUrl;
  }

  public async next(): Promise<boolean> {
    if (this.hasNext === false) {
      this._data = [];
      return false;
    }

    const result = await this.axios.get(
      this.buildUrl(this.nextPageToken, this.limit)
    );
    const newData = result.data as PaginatedResult<T>;
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
