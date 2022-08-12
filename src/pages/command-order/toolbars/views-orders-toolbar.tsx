import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useParams } from "react-router-dom";

import { useServices } from "../../../services-def";
import { VIEW_COMMAND_ORDERS } from "../routes";

interface ViewOrderToolbarParams {
  projectId: string;
  selectedPath: string;
}

export function ViewOrderToolbar() {
  const { t } = useTranslation();
  const { projectId, selectedPath } = useParams<ViewOrderToolbarParams>();
  const { routes } = useServices();

  return (
    <Button
      variant="contained"
      component={RouterLink}
      to={routes.render(VIEW_COMMAND_ORDERS, { projectId, selectedPath })}
    >
      {t("project_reports.command_order")}
    </Button>
  );
}
