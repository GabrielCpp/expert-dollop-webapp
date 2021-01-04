import { ReduxDatabase, PrimaryIndex, TableRecord } from "./common/redux-db";
import { FormFieldTableName, createPrimaryIndex } from "./components/table-fields";

export function buildDbSchema(db: ReduxDatabase) {
    db.addTable('project_definition');
    db.addTable('project_container_definition');
    db.addTable('translation',
        new PrimaryIndex((record: TableRecord) => `${record.ressourceId}-${record.locale}-${record.name}`)
    );

    db.addTable(FormFieldTableName, createPrimaryIndex())
}