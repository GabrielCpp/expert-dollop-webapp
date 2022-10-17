import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  DefaultDropdownButton,
  DropdownItem,
} from "../../../components/buttons";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useServices } from "../../../services-def";
import { useProjectDefPath } from "../hooks/project-def-path";
import {
  buildAddNodeParams,
  buildEditNodeParams,
  PROJECT_DEFINITION_EDITOR_NODE_ADD,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";

interface RootSectionActionsToolbarParams {
  projectDefinitionId: string;
  selectedPath: string;
}

export function RootSectionActionsToolbar() {
  const { t } = useTranslation();
  const { routes } = useServices();
  const { projectDefinitionId, selectedPath } =
    useParams<RootSectionActionsToolbarParams>();
  const { error, loading, path } = useProjectDefPath(
    projectDefinitionId,
    selectedPath
  );
  const [rootSectionDefId] = path || [];
  useLoaderEffect(error, loading);

  const mainActions: DropdownItem[] = [
    {
      label: () =>
        t("definition_editor.root_section_actions_toolbar.add_root_section"),
      link: routes.render(
        PROJECT_DEFINITION_EDITOR_NODE_ADD,
        buildAddNodeParams(projectDefinitionId, [])
      ),
      key: "add",
      buttonProps: {
        startIcon: <AddIcon />,
      },
    },
  ];

  if (loading || rootSectionDefId === undefined) {
    return <DefaultDropdownButton mainActions={mainActions} subActions={[]} />;
  }

  const subActions: DropdownItem[] = [
    {
      label: () =>
        t("definition_editor.root_section_actions_toolbar.edit_root_section"),
      link: routes.render(
        PROJECT_DEFINITION_EDITOR_NODE_EDIT,
        buildEditNodeParams(projectDefinitionId, [], rootSectionDefId)
      ),
      key: "edit",
    },
  ];

  return (
    <DefaultDropdownButton mainActions={mainActions} subActions={subActions} />
  );
}
