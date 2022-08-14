import { NamedRoutes } from "../shared/named-routes";
import { routes as projectDefinitionEditorRoutes } from "../pages/project-definition-editor";
import { routes as projectEditorRoutes } from "../pages/project-editor";
import { routes as datasheetRoutes } from "../pages/datasheet-editor";
import { routes as reportRoutes } from "../pages/project-reports";
import { routes as authRoutes } from "../pages/account";
import { routes as commandOrdersRoutes } from "../pages/command-order";

export function createNamedRouteService() {
  return new NamedRoutes([
    ...projectDefinitionEditorRoutes,
    ...projectEditorRoutes,
    ...datasheetRoutes,
    ...reportRoutes,
    ...authRoutes,
    ...commandOrdersRoutes,
  ]);
}
