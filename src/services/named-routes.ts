import { NamedRoutes } from "../shared/named-routes";
import { routes as apiRoutes } from "../api-routes";
import { routes as projectDefinitionEditorRoutes } from "../pages/project-definition-editor";
import { routes as projectEditorRoutes } from "../pages/project-editor";
import { routes as datasheetDefinitionRoutes } from "../pages/datasheet-template-editor";
import { routes as datasheetRoutes } from "../pages/datasheet-editor";

export function createNamedRouteService() {
  return new NamedRoutes([
    ...apiRoutes,
    ...projectDefinitionEditorRoutes,
    ...projectEditorRoutes,
    ...datasheetDefinitionRoutes,
    ...datasheetRoutes,
  ]);
}
