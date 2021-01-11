import { ContainerModule, interfaces } from "inversify";
import { NamedRoutes } from "../common/named-routes";
import { routes as projectDefinitionEditorRoutes } from '../components/predykt-project-definition-editor'

export const namedRoutesModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(NamedRoutes).toConstantValue(new NamedRoutes([
        ...projectDefinitionEditorRoutes
    ]));
});