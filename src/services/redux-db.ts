import { ReduxDatabase } from "../shared/redux-db/database";
import { setupFormTables } from "../components/table-fields";
import { setupTables as setupTranslationTables } from "../components/translation/tables";
import { setupSnackbarTable } from "../components/snackbar-display";

export function createReduxDb(): ReduxDatabase {
  const db = new ReduxDatabase();
  setupFormTables(db);
  setupTranslationTables(db);
  setupSnackbarTable(db);
  return db;
}
