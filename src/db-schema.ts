import { ReduxDatabase } from "./common/redux-db/database";

export function buildDbSchema(db: ReduxDatabase) {
    db.addTable('project_definition');
    db.addTable('project_container_definition');
}