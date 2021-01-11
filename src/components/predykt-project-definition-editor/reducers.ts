import { ReduxDatabase } from "../../common/redux-db";
import { ProjectContainerDefinitionService } from "../../services"
import { queryChildrenOf, FormFieldRecord, hydrateForm } from "../table-fields";
import { TranslationService } from '../../services/api/translation-service';
import { AddContainerViewModel } from './add-container-view';
import { createProjectContainerDefinition, createTranslation, Translation, ProjectContainerDefinition } from '../../models';

const ProjectContainerDefinitionTableName = 'project_container_definition';

const upsertContainerDefinitions = (database: ReduxDatabase) => (containers: ProjectContainerDefinition[]) => {
    database.getTable(ProjectContainerDefinitionTableName).upsertMany(containers)
}

const TranslationTableName = 'translation'

const upsertTranslations = (database: ReduxDatabase) => (translations: Translation[]) => {
    database.getTable(TranslationTableName).upsertMany(translations);
}

export const addContainerDefinitionProvider = (
    database: ReduxDatabase,
    projectContainerDefinitionService: ProjectContainerDefinitionService, 
    translationService: TranslationService
) => async (projectDefinitionId: string, path: string[], formId: string) => {
    const results = database.query<FormFieldRecord>(queryChildrenOf([formId]))    
    const form = hydrateForm<AddContainerViewModel>(results);

    const containers = await projectContainerDefinitionService.addProjectContainerDefinitions(
        projectDefinitionId, [
        createProjectContainerDefinition(
            formId,
            projectDefinitionId,
            form.name.value,
            path,
            'CONTAINER',
            {},
            form.instanciateByDefault.value,
            form.isCollection.value,
            {}
        )
    ]);

    const translations = await translationService.addTranslations([
        createTranslation(projectDefinitionId, 'fr', `${form.name.value}_label`, form.fr.label.value),
        createTranslation(projectDefinitionId, 'fr', `${form.name.value}_help_text`, form.fr.label.value),
        createTranslation(projectDefinitionId, 'en', `${form.name.value}_label`, form.en.label.value),
        createTranslation(projectDefinitionId, 'en', `${form.name.value}_help_text`, form.en.label.value),
    ])

    database.transaction((db) => {
        upsertContainerDefinitions(db)(containers)
        upsertTranslations(db)(translations)
    });
}

