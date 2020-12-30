import { Database } from './database'
import { ops, queryParam, recordParam } from './query';
import { QueryBuilder } from './query-builder';
import { TableRecord } from './table-record';

interface Todo extends TableRecord {
    id: string;
    description: string;    
}

describe('Database', () => {
    let database: Database;
    let initialTodos: Todo[]

    beforeEach(() => {
        initialTodos =  [
            { id: "1", description: "I must do A" },
            { id: "2", description: "I must do B" },
            { id: "3", description: "I must do C" }
        ]

        database = new Database();
        database.getTable('todo').upsertMany(initialTodos as TableRecord[])
    })

    test('given todos should query everything', (done) => {
        function onChange(records: TableRecord[]) {
            expect(records).toEqual(initialTodos);
            done();
        }

        database.watchQuery(QueryBuilder.fromTable('todo').query, onChange)
    })

    test('given todos query with predicate should filter results', (done) => {
        const expectedResult = { id: "2", description: "I must do B" };

        function onChange(records: TableRecord[]) {
            expect(records).toEqual([expectedResult]);
            done();
        }

        database.watchQuery(
            QueryBuilder.fromTable('todo')
            .where(ops("$eq", 
                ops("$number", recordParam("id")),
                queryParam('id')
            ))
            .bindParameters({
                "id": 2
            })
            .query, 
            onChange
        )
    })
})