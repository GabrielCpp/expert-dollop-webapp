import { TableRecord } from "../common/redux-db/table-record";

export interface ProjectContainerDefinition extends TableRecord {
    customAttributes: Record<string, unknown>;
    defaultValue: Record<string, unknown>;
    id: string;
    instanciateByDefault: boolean;
    isCollection: boolean;
    name: string;
    path: string[]
    projectDefId: string;
    value_type: string;
}


export interface ProjectContainerDefinitionRoot {
    children: ProjectContainerDefinitionTree[]
    childrenIndex: Map<string, ProjectContainerDefinitionTree>
}

export interface ProjectContainerDefinitionTree extends ProjectContainerDefinition {
    children: ProjectContainerDefinitionTree[]
    childrenIndex: Map<string, ProjectContainerDefinitionTree>
}