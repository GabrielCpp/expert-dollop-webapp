import { AddButtonLink } from "../../../components/buttons";
import { useServices } from "../../../services-def";
import { DEFINITION_ADD } from "../routes";

export function CreateProjectDefinitionToolbar() {
  const { routes } = useServices();

  return (
    <AddButtonLink
      label="definition_editor.toolbars.create_definition_button"
      to={routes.render(DEFINITION_ADD)}
    />
  );
}
