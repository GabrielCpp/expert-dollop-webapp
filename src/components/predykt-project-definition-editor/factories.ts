import { TranslationInput, ProjectDefinitionNodeInput, NodeConfigInput, FieldValueInput } from '../../generated'

export function createTranslation(
    ressourceId: string,
    scope: string,
    locale: string,
    name: string,
    value: string,
): TranslationInput {
    return {
        ressourceId,
        scope,
        locale,
        name,
        value
    };
}

export function createProjectContainerDefinition(
    id: string,
    projectDefId: string,
    name: string,
    path: string[],
    valueType: string,
    defaultValue: FieldValueInput,
    instanciateByDefault: boolean,
    isCollection: boolean,
    orderIndex: number,
    config: NodeConfigInput,
): ProjectDefinitionNodeInput {
    return {
        config: config,
        defaultValue: defaultValue,
        id,
        instanciateByDefault,
        isCollection,
        orderIndex,
        name,
        path,
        projectDefId,
        valueType,
    }
}