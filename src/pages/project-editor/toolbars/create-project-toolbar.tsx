import { useServices } from "../../../services-def";
import { ADD_PROJECT_VIEW } from "../routes";
import { AddButtonLink } from "../../../components/buttons";

export function HomeToolbar() {
  const { routes } = useServices();

  return (
    <AddButtonLink
      label="project_editor.toolbars.create_project"
      to={routes.render(ADD_PROJECT_VIEW)}
    />
  );
}
