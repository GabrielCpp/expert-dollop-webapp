import { TableRecord } from "../common/redux-db/table-record";

export interface ProjectDefinition extends TableRecord {
    default_datasheet_id: string;
    id: string
    name: string;
}