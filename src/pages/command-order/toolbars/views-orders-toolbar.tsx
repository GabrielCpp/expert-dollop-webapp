import Button from "@mui/material/Button";
import { Link as RouterLink, useParams } from "react-router-dom";
import { DropdownButton, DropdownItem } from "../../../components/buttons";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useDbTranslation } from "../../../components/translation";
import { useFindDistributablesQuery } from "../../../generated";

import { useServices } from "../../../services-def";
import { VIEW_COMMAND_ORDERS } from "../routes";

interface ViewOrderToolbarParams {
  projectId: string;
  selectedPath: string;
}

export function ViewOrderToolbar() {
  const { projectId, selectedPath } = useParams<ViewOrderToolbarParams>();
  const { t, dbTrans } = useDbTranslation(projectId);
  const { routes } = useServices();
  const { data, loading, error } = useFindDistributablesQuery({
    variables: { projectId },
  });
  useLoaderEffect(error, loading);

  if (data === undefined || data.findDistributables.length === 0) {
    return null;
  }

  if (data.findDistributables.length === 1) {
    const { id: reportDefinitionId, name } = data.findDistributables[0];

    return (
      <Button
        variant="contained"
        component={RouterLink}
        to={routes.render(VIEW_COMMAND_ORDERS, {
          projectId,
          selectedPath,
          reportDefinitionId,
        })}
      >
        {dbTrans(name)}
      </Button>
    );
  }

  const links: DropdownItem[] = data.findDistributables.map(
    ({ id: reportDefinitionId, name }) => ({
      label: () => dbTrans(name),
      key: reportDefinitionId,
      link: routes.render(VIEW_COMMAND_ORDERS, {
        projectId,
        selectedPath,
        reportDefinitionId,
      }),
    })
  );

  return (
    <DropdownButton label={t("project_reports.command_order")} items={links} />
  );
}
