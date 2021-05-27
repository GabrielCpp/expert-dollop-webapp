import { NamedRoutes } from "../shared/named-routes";
import { routes as projectDefinitionEditorRoutes } from "../components/predykt-project-definition-editor";
import { routes as projectEditorRoutes } from "../components/project-editor";
import { routes as datasheetDefinitionRoutes } from "../components/datasheet-template-editor";

export function createNamedRouteService() {
  return new NamedRoutes([
    ...projectDefinitionEditorRoutes,
    ...projectEditorRoutes,
    ...datasheetDefinitionRoutes,
  ]);
}
