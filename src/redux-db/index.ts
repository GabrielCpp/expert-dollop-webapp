import { createContext, useState, useContext } from 'react'
import { mapValues, noop } from 'lodash'

type Watcher<T> = (value: T) => void;
type QueryWatcher<T> = (value: T[]) => void;
type Predicate<T> = (e: T, index: number) => boolean;
type ValueWaterMap<T> = Map<Watcher<T>, ValueWatcher<T>>

interface ValueWatcher<T> {
    onUpdate: Watcher<T>;
    onRemove: Watcher<T>
}

interface TableEntry<T> {
    value: T;
    watchers: ValueWaterMap<T>
}

function createTableEntry<T>(value: T): TableEntry<T> {
    return {
        value,
        watchers: new Map<Watcher<T>, ValueWatcher<T>>()
    }
}

interface TableIndex<T> {
    getKey: (e: T) => string
    data: Record<string, TableEntry<T> | undefined>
}

interface QueryWatcherCache<T> {
    results: Set<string>;
    predicate: Predicate<T>;
    setResults: QueryWatcher<T>;
}

interface Table<T> {
    orderedView: string[];
    views: Record<string, TableIndex<T>>;
    watchers: Map<QueryWatcher<T>, QueryWatcherCache<T>>;
}

export interface TableInstance<T> {
    findById(itemId: string): T | undefined;
    upsert(item: T): void;
    removeById(itemId: string): void
    remove(itemId: T): void
    watch(itemKey: string, onUpdate: Watcher<T>, onRemove: Watcher<T>): void;
    watchView(viewName: string, itemKey: string, onUpdate: Watcher<T>, onRemove: Watcher<T>): void;
    watchQuery(predicate: (e: T, index: number) => boolean, setResults: (e: T[]) => void): T[] | undefined ;
    data: T[];
}

export interface ValueStore {
    tables: Record<string, TableInstance<unknown>>
}


export function createTable<T>(table: Table<T>): TableInstance<T> {
    class QueryWatcherAccumulator {
        private updateSet = new Set<QueryWatcherCache<T>>();

        public checkForUpdates(itemId: string, item?: T | undefined, index: number = -1) {
            for(const cache of table.watchers.values()) {
                if(cache.results.has(itemId) || (item !== undefined && cache.predicate(item, index) === true)) {
                    this.updateSet.add(cache);
                }
            }
        }

        public applyUpdates() {
            for(const cache of this.updateSet) {
                const newResults = new Set(queryOrderedView(cache.predicate))
                cache.results = newResults
                const newObjs = mapPkToValue(newResults)
                cache.setResults(newObjs)
            }
        }
    }

    function triggerUpdateWatchers(watchers: ValueWaterMap<T>, value: T) {
        for(const watcher of watchers.values()) {
            watcher.onUpdate(value)
        }
    }

    function triggerRemoveWatchers(watchers: ValueWaterMap<T>, value: T) {
        for(const watcher of watchers.values()) {
            watcher.onRemove(value)
        }
    }


    function upsert(item: T) {
        let shouldAppendItem = false;

        for(const view of Object.values(table.views)) {
            const key = view.getKey(item)
            const tableEntry = view.data[key];

            if(tableEntry !== undefined) {
                triggerUpdateWatchers(tableEntry.watchers, item);
                tableEntry.value = item;
            }
            else {
                view.data[key] = createTableEntry(item)
                shouldAppendItem = true                
            }            
        }

        const pkKey = table.views['pk'].getKey(item);
        const queryWatcherBatch = new QueryWatcherAccumulator()

        if(shouldAppendItem === true) {            
            table.orderedView.push(pkKey)
            queryWatcherBatch.checkForUpdates(pkKey, item, table.orderedView.length - 1)
        }
        else {
            queryWatcherBatch.checkForUpdates(pkKey)
        }        

        queryWatcherBatch.applyUpdates()
    }

    function removeById(itemId: string) {
        const queryWatcherBatch = new QueryWatcherAccumulator()
        const tableEntry = table.views['pk'].data[itemId]

        if(tableEntry === undefined) {
            return;
        }

        for(const view of Object.values(table.views)) {
            const key = view.getKey(tableEntry.value)
            view.data[key] = undefined;
            delete view.data[key];
            triggerRemoveWatchers(tableEntry.watchers, tableEntry.value)
            queryWatcherBatch.checkForUpdates(key)
        }

        queryWatcherBatch.applyUpdates()
    }

    function remove(value: T) {
        const itemId = table.views['pk'].getKey(value);
        removeById(itemId);
    }

    function watch(itemKey: string, onUpdate: Watcher<T>, onRemove: Watcher<T>) {
        watchView('pk', itemKey, onUpdate, onRemove);        
    }

    function watchView(viewName: string, itemKey: string, onUpdate: Watcher<T>, onRemove: Watcher<T>) {
        const tableEntry = table.views[viewName].data[itemKey];

        if(tableEntry !== undefined && !tableEntry.watchers.has(onUpdate)) {
            tableEntry.watchers.set(onUpdate, {
                onUpdate,
                onRemove
            })
        }       
    }

    function findById(itemId: string): T | undefined {
        const tableEntry = table.views['pk'].data[itemId];

        if(tableEntry !== undefined) {
            return tableEntry.value
        }        

        return undefined
    }

    function queryOrderedView(predicate: Predicate<T>): string[] {
        const pkView = table.views['pk'];
        
        return table.orderedView.filter((key, index) => {
            const tableEntry = pkView.data[key];

            if(tableEntry !== undefined) {
                return predicate(tableEntry.value, index)
            }
            
            return false
        });
    }

    function mapPkToValue(idResults: Set<string> | string[]) {
        const pkView = table.views['pk'];
        const results: T[] = []

        for(const idResult of idResults) {
            const tableEntry = pkView.data[idResult]

            if(tableEntry !== undefined) {
                results.push(tableEntry.value)
            }
        }

        return results
    }

    function watchQuery(predicate: Predicate<T>, setResults: (e: T[]) => void): T[] | undefined {
        let watcher = table.watchers.get(setResults)

        if(watcher === undefined) {
             const idResults = new Set(queryOrderedView(predicate));
            table.watchers.set(setResults, {
                predicate,
                results: idResults,
                setResults
            })
            
            const results = mapPkToValue(idResults)

            return results
        }

        return undefined;
    }

    return {
        findById,
        watch,
        watchView,
        watchQuery,
        removeById,
        remove,
        upsert,
        get data (): T[] {
            return mapPkToValue(table.orderedView)
        }
    }
} 

export interface TableSchema<T> {
    getPkKey: (e: T) => string
    views: Record<string,  (e: T) => string>
    defaultData: T[]
}

export function createDb(tables: Record<string, TableSchema<any>>={}): ValueStore {
    return {
        tables: mapValues(tables, tableSchema => createTable({
            orderedView: tableSchema.defaultData.map(value => tableSchema.getPkKey(value)),
            views: {
                'pk': {
                    getKey: tableSchema.getPkKey,
                    data: tableSchema.defaultData.reduce((prev, current) => {
                        const key = tableSchema.getPkKey(current);
                        prev[key] = createTableEntry(current);
                        return prev;
                     }, {})
                },
                ...mapValues(tableSchema.views, getKey => ({
                    getKey,
                    data: tableSchema.defaultData.reduce((prev, current) => {
                        const key = getKey(current);
                        prev[key] = createTableEntry(current);
                        return prev;
                     }, {})
                }))
            },
            watchers: new Map<QueryWatcher<unknown>, QueryWatcherCache<unknown>>()
        }))
    };
}


export const DatabaseContext = createContext<ValueStore>(createDb());

export function useTableItem<T>(tableName: string, itemId: string, onRemove: Watcher<T>=noop) {
    const db = useContext(DatabaseContext)
    const table = db.tables[tableName]
    const [item, setItem] = useState<T>(table.findById(itemId) as T)
    table.watch(
        itemId, 
        setItem as (v: unknown) => void, 
        onRemove as Watcher<unknown>
    );

    return item;
}

export function useTableItemProvider<T>(tableName: string, itemId: string, onRemove: Watcher<T>=noop): [T, (v: T) => void, (v: T) => void] {
    const db = useContext(DatabaseContext)
    const table = db.tables[tableName]
    const [item, setItem] = useState<T>(table.findById(itemId) as T)

    table.watch(
        itemId, 
        setItem as (v: unknown) => void, 
        onRemove as Watcher<unknown>
    );

    function updateItem(value: T): void {
        setItem(value)
        table.upsert(value)
    }

    return [item, updateItem, setItem]
}

export function useTable<T>(tableName: string): TableInstance<T> {
    const db = useContext(DatabaseContext)
    return db.tables[tableName] as TableInstance<T>
}

export function useTableQuery<T>(tableName: string, predicate: Predicate<T>): T[] {
    const db = useContext(DatabaseContext)
    const tableInstance = db.tables[tableName] as TableInstance<T>
    const [results, setResults] = useState<T[]>([])
    const firstResults = tableInstance.watchQuery(predicate, setResults)
    return firstResults || results;
}