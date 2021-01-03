
export type FilterNode = [string, FilterNode[]]

export interface QueyrJoin {
    onTable: string;
    where: FilterNode | [];
    toProperty: string;
}

export interface QuerySort {
    path: string;
    asc: boolean;
}

export interface Query {
    fromTable: string;
    joins: QueyrJoin[]
    where: FilterNode | [];
    sort: QuerySort[]
    projections: [string, string][]
    parameters: Record<string, unknown>
}

export function ops(name: string, ...args: FilterNode[]): FilterNode {
    return [`$${name}`, args]
}

export function queryParam(name: string): FilterNode {
    return [`:${name}`, []]
}

export function joinParam(name: string): FilterNode {
    return [`.${name}`, []]
}

export function recordParam(name: string): FilterNode {
    return [name, []]
}