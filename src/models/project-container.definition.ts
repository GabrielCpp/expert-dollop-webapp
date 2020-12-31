import { TableRecord } from "../common/redux-db/table-record";

export interface ProjectContainerDefinition extends TableRecord {
    custom_attributes: Record<string, unknown>;
    default_value: Record<string, unknown>;
    id: string;
    instanciate_by_default: boolean;
    is_collection: boolean;
    mixed_paths: string[]
    name: string;
    path: string[]
    project_def_id: string;
    value_type: string;
}