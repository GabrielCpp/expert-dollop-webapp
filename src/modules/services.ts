import { ContainerModule, interfaces } from "inversify";
import { injection } from "../common/container-context";
import { AXIOS_SERVICE, ProjectContainerDefinitionService, ProjectDefinitionService } from "../services";


export const servicesModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(ProjectContainerDefinitionService).to(injection(ProjectContainerDefinitionService, AXIOS_SERVICE))
    bind(ProjectDefinitionService).to(injection(ProjectDefinitionService, AXIOS_SERVICE))
});