import buildUrl from 'build-url'
import { isNumber } from 'lodash'
import { AsyncCursor } from './cursor'

export function buildRelativeUrl(path: string, queryParams: { [name: string]: string | string[] | undefined | number }): string {
    const mappedParams: { [name: string]: string | string[] } = {}

    for(const [key, value] of Object.entries(queryParams)) {
        if(value === undefined) {
            continue
        }

        if(isNumber(value)) {
            mappedParams[key] = String(value)
        }

        mappedParams[key] = value as (string | string[])
    }

    return buildUrl('', {
        path,
        queryParams: mappedParams
    })
}

export async function concatAll<T>(cursor: AsyncCursor<T[]>): Promise<T[]> {
    let results: T[] = []

    while(await cursor.next()) {
        results = [...results, ...cursor.data()]
    }

    return results;
}