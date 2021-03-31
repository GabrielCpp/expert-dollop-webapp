import { ReduxDatabase } from "../shared/redux-db/database";  
import { addFormFieldRecordTable } from "../components/table-fields";
import { setupTables as setupTranslationTables } from '../components/translation/tables';

export function createReduxDb(): ReduxDatabase {
    const db = new ReduxDatabase();
    addFormFieldRecordTable(db);
    setupTranslationTables(db)
    return db;
}