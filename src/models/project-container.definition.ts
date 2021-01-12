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
    orderIndex: number;
}

export function createProjectContainerDefinition(
    id: string,
    projectDefId: string,
    name: string,
    path: string[],
    value_type: string,
    defaultValue: Record<string, unknown>,
    instanciateByDefault: boolean,
    isCollection: boolean,
    orderIndex: number,
    customAttributes: Record<string, unknown>,
): ProjectContainerDefinition {
    return {
        customAttributes,
        defaultValue,
        id,
        instanciateByDefault,
        isCollection,
        orderIndex,
        name,
        path,
        projectDefId,
        value_type,
    }
}

export interface ProjectContainerDefinitionRoot {
    children: ProjectContainerDefinitionTree[]
    childrenIndex: Map<string, ProjectContainerDefinitionTree>
}

export interface ProjectContainerDefinitionTree extends ProjectContainerDefinition {
    children: ProjectContainerDefinitionTree[]
    childrenIndex: Map<string, ProjectContainerDefinitionTree>
}