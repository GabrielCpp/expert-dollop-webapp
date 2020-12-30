
export type QueryParameter = Map<string, unknown>
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
    where: FilterNode | [];
    joins: QueyrJoin[]
    sort: QuerySort[]
    parameters: QueryParameter
}

