import { useServices } from "../../../services-def";
import { ADD_PROJECT_VIEW } from "../routes";
import { AddButtonLink } from "../../../components/buttons";

export function HomeToolbar() {
  const { routes } = useServices();

  return (
    <AddButtonLink
      label="definition_editor.toolbar.create_root_node_button"
      to={routes.render(ADD_PROJECT_VIEW)}
    />
  );
}
