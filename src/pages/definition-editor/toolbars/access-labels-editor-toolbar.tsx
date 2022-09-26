import { useParams } from "react-router-dom";
import { OutlinedButtonLink } from "../../../components/buttons";
import { useServices } from "../../../services-def";
import { DEFINITION_EDITION_LABELS_EDITION } from "../routes";

export function AccessLabelsEditorToolbar() {
  const { routes } = useServices();
  const params = useParams();

  return (
    <OutlinedButtonLink
      label="definition_editor.access_labels_editor_toolbar.labels"
      to={routes.render(DEFINITION_EDITION_LABELS_EDITION, params)}
    />
  );
}
