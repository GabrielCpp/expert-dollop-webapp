import { TableRecord } from "../common/redux-db/table-record";

export interface ProjectDefinition extends TableRecord {
    defaultDatasheetId: string;
    id: string
    name: string;
}