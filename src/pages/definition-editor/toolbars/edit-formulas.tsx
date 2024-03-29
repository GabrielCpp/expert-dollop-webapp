import { useParams } from "react-router-dom";
import { OutlinedButtonLink } from "../../../components/buttons";
import { useServices } from "../../../services-def";
import { PROJECT_DEFINITION_EDITOR_FORMULAS_EDIT } from "../routes";

export function EditFormulas() {
  const { routes } = useServices();
  const params = useParams();

  return (
    <OutlinedButtonLink
      label="definition_editor.edit_formulas.formulas"
      to={routes.render(PROJECT_DEFINITION_EDITOR_FORMULAS_EDIT, params)}
    />
  );
}
