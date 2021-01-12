import { ContainerModule, interfaces } from "inversify";
import { injectFunction } from "../common/container-context";
import { ReduxDatabase } from "../common/redux-db";
import { addContainerDefinitionProvider } from "../components/predykt-project-definition-editor";
import { validateForm } from "../components/table-fields";
import { ProjectContainerDefinitionService, TranslationService } from '../services';
import { AJV_CUSTOM_ERROR } from '../services/ajv';


export const containerReducerModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(addContainerDefinitionProvider).to(injectFunction(addContainerDefinitionProvider, [
        ReduxDatabase,
        ProjectContainerDefinitionService,
        TranslationService
    ]));

    bind(validateForm).to(injectFunction(validateForm, [ReduxDatabase, AJV_CUSTOM_ERROR]))
});