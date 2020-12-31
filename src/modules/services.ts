import { ContainerModule, interfaces } from "inversify";
import { ProjectContainerDefinitionService, ProjectDefinitionService } from "../services";


export const servicesModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(ProjectContainerDefinitionService).to(ProjectContainerDefinitionService)
    bind(ProjectDefinitionService).to(ProjectDefinitionService)
});