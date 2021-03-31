import { ReduxDatabase } from "../../shared/redux-db";
import { queryChildrenOf, FormFieldRecord, hydrateForm } from "../table-fields";
import { AddContainerViewModel } from './views/add-container-view';
import { Translation, ProjectDefinitionNode } from '../../generated';
import { createProjectContainerDefinition, createTranslation } from './factories'

const ProjectContainerDefinitionTableName = 'project_container_definition';

const upsertContainerDefinitions = (database: ReduxDatabase) => (containers: ProjectDefinitionNode[]) => {
    database.getTable(ProjectContainerDefinitionTableName).upsertMany(containers)
}

const TranslationTableName = 'translation'

const upsertTranslations = (database: ReduxDatabase) => (translations: Translation[]) => {
    database.getTable(TranslationTableName).upsertMany(translations);
}

export const addContainerDefinitionProvider = (
    database: ReduxDatabase,
    projectContainerDefinitionService: any, 
    translationService: any
) => async (projectDefinitionId: string, path: string[], formId: string) => {
    const results = database.query<FormFieldRecord>(queryChildrenOf([formId]))    
    const form = hydrateForm<AddContainerViewModel>(results);
/*
    const containers = await projectContainerDefinitionService.addProjectContainerDefinitions([
        createProjectContainerDefinition(
            formId,
            projectDefinitionId,
            form.name.value,
            path,
            'CONTAINER',
            {},
            form.instanciateByDefault.value,
            form.isCollection.value,
            form.orderIndex.value,
            {}
        )
    ]);

    const translations = await translationService.addTranslations([
        createTranslation(projectDefinitionId, projectDefinitionId, 'fr', `${form.name.value}_label`, form.fr.label.value),
        createTranslation(projectDefinitionId, projectDefinitionId, 'fr', `${form.name.value}_help_text`, form.fr.label.value),
        createTranslation(projectDefinitionId, projectDefinitionId, 'en', `${form.name.value}_label`, form.en.label.value),
        createTranslation(projectDefinitionId, projectDefinitionId, 'en', `${form.name.value}_help_text`, form.en.label.value),
    ])

    database.transaction((db) => {
        upsertContainerDefinitions(db)(containers)
        upsertTranslations(db)(translations)
    });*/
}

