import { PrimaryKey, QueryResultChangeWatcher, QUERY_RESULT_CHANGE_EVENT, TableRecord } from './table-record'
import { TableTransaction } from './table-transaction';
import { EventEmitter } from 'fbemitter';

export class TableQueryWatcher implements QueryResultChangeWatcher {
    private lastResult: Set<PrimaryKey>;
    private predicates: Array<(record: TableRecord) => boolean>;
    private emitter = new EventEmitter()

    public constructor(lastResult: Set<PrimaryKey>, predicates: Array<(record: TableRecord) => boolean>) {
        this.lastResult = lastResult;
        this.predicates = predicates
        this.triggerQueryResult = this.triggerQueryResult.bind(this);
    }

    public checkForUpdate(eventAccumulator: TableTransaction, recordPrimaryKey: PrimaryKey) {
        if(this.lastResult.has(recordPrimaryKey)) {
            eventAccumulator.addQueryUpdate(this)
        }
    }    

    public checkForAddition(eventAccumulator: TableTransaction, record: TableRecord) {
        if(this.predicates.some(predicate => predicate(record))) {
            eventAccumulator.addQueryUpdate(this)
        }
    }   

    public triggerQueryResult(): void {
        this.emitter.emit(QUERY_RESULT_CHANGE_EVENT)
    }
} 