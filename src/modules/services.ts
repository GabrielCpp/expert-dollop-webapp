import { ContainerModule, interfaces } from "inversify";
import { injectClass } from "../common/container-context";
import { AXIOS_SERVICE, ProjectContainerDefinitionService, ProjectDefinitionService, TranslationService } from "../services";


export const servicesModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(ProjectContainerDefinitionService).to(injectClass(ProjectContainerDefinitionService, AXIOS_SERVICE))
    bind(ProjectDefinitionService).to(injectClass(ProjectDefinitionService, AXIOS_SERVICE))
    bind(TranslationService).to(injectClass(TranslationService, AXIOS_SERVICE))
});