import { useParams } from "react-router-dom";
import { OutlinedButtonLink } from "../../../components/buttons";
import { useServices } from "../../../services-def";
import { DEFINITION_REPORT_VIEW } from "../routes";

export function ReportsEditorToolbar() {
  const { routes } = useServices();
  const params = useParams();

  return (
    <OutlinedButtonLink
      label="definition_editor.toolbars.reports"
      to={routes.render(DEFINITION_REPORT_VIEW, params)}
    />
  );
}
