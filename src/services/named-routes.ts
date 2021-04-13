import { NamedRoutes } from "../shared/named-routes";
import { routes as projectDefinitionEditorRoutes } from "../components/predykt-project-definition-editor";

export function createNamedRouteService() {
  return new NamedRoutes([...projectDefinitionEditorRoutes]);
}
