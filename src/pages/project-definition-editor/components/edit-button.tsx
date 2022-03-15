import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link as RouterLink } from "react-router-dom";

import { useServices } from "../../../services-def";
import {
  buildEditNodeParams,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";

export interface EditButtonProps {
  projectDefinitionId: string;
  path: string[];
  id: string;
}

export function EditButton({ projectDefinitionId, path, id }: EditButtonProps) {
  const { routes } = useServices();
  return (
    <IconButton
      aria-label="settings"
      size="small"
      component={RouterLink}
      to={routes.render(
        PROJECT_DEFINITION_EDITOR_NODE_EDIT,
        buildEditNodeParams(projectDefinitionId, path, id)
      )}
    >
      <EditIcon />
    </IconButton>
  );
}
