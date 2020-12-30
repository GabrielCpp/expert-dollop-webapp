
import { FilterNode, Query } from './query';

export class QueryBuilder {
    public query: Query;

    public static fromTable(tableName: string) {
        const query: Query= {
            fromTable: tableName,
            joins: [],
            parameters: new Map<string, unknown>(),
            projections: [],
            sort: [],
            where: []
        }

        return new QueryBuilder(query);
    }

    private constructor(query: Query) {
        this.query = query;
    }

    public bindParameters(parameters: Record<string, unknown>) {
        for(const [key, value] of Object.entries(parameters)) {
            this.query.parameters.set(key, value)
        } 

        return this;
    }

    public project<T, U>(fields: Record<keyof U, (e: T) => unknown>) {
        const paths: string[] = []
        const proxy: unknown = new Proxy<object>({}, {
            get: function(_, prop: string){
                paths.push(prop)
                return proxy;
            }
        })

        for(const [alias, pathGetter] of Object.entries(fields)) {
            (pathGetter as (p: unknown) => unknown)(proxy)
            const path = paths.join('.')
            paths.splice(0, paths.length)
            this.query.projections.push([path, alias])
        } 

        return this;
    }

    public join(tableName: string, toProperty: string, where: FilterNode) {
        this.query.joins.push({
            onTable: tableName,
            toProperty,
            where
        })

        return this;
    }

    public where(filter: FilterNode) {
        this.query.where = filter;
        return this;
    }

    public sort(paths: [string, 'asc' | 'desc'][]) {
        this.query.sort = paths.map(([path, direction]) => ({
            asc: direction === 'asc',
            path
        }));

        return this;
    }
}
