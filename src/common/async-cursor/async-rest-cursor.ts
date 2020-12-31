import { AxiosInstance } from "axios";
import { AsyncCursor } from "./cursor";

export type BuildUrlFn = (nextPageToken: string | undefined, limit: number) => string;

export  class AsyncRestCursor<T> implements AsyncCursor<T[]> {
    private readonly axios: AxiosInstance;
    private limit: number;
    private buildUrl: BuildUrlFn;

    private _data: T[] = []
    private nextPageToken: string | undefined = undefined;
    private hasNext: boolean = true

    public nextPageTokenHeader = "X-Next-page-token"

    public constructor(axios: AxiosInstance, limit: number, buildUrl: BuildUrlFn) {
        this.axios = axios;
        this.limit = limit;
        this.buildUrl = buildUrl;
    }

    public async next(): Promise<boolean> {
        if(this.hasNext === false) {
            return false;
        }

        const result = await this.axios.get(this.buildUrl(this.nextPageToken, this.limit))
        const newData = JSON.parse(result.data) as T[]
        const lastHasNext = this.hasNext;
        this.nextPageToken = result.headers[this.nextPageTokenHeader];

        this.hasNext = this.nextPageToken === undefined || newData.length < this._data.length;
        this._data = newData

        return lastHasNext;
    }

    public get data(): T[] {
        return this._data;
    }
}
