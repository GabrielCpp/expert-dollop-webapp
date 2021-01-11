import { ContainerModule, interfaces } from "inversify";
import { injectFunction } from "../common/container-context";
import { ReduxDatabase } from "../common/redux-db";
import { addContainerDefinitionProvider } from "../components/predykt-project-definition-editor";
import { ProjectContainerDefinitionService, TranslationService } from '../services';


export const containerReducerModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(addContainerDefinitionProvider).to(injectFunction(addContainerDefinitionProvider, [
        ReduxDatabase,
        ProjectContainerDefinitionService,
        TranslationService
    ]));
});