import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link as RouterLink } from "react-router-dom";

import { useServices } from "../../../services-def";
import {
  buildEditNodeParams,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";

export interface EditButtonProps {
  projectDefId: string;
  path: string[];
  id: string;
}

export function EditButton({ projectDefId, path, id }: EditButtonProps) {
  const { routes } = useServices();
  return (
    <IconButton
      aria-label="settings"
      size="small"
      component={RouterLink}
      to={routes.render(
        PROJECT_DEFINITION_EDITOR_NODE_EDIT,
        buildEditNodeParams(projectDefId, path, id)
      )}
    >
      <EditIcon />
    </IconButton>
  );
}
