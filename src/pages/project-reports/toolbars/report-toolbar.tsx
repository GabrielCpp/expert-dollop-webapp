import { useParams } from "react-router-dom";
import { DropdownButton, DropdownItem } from "../../../components/buttons";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useDbTranslation } from "../../../components/translation";
import { useFindReportDefinitionsFromProjectDetailsQuery } from "../../../generated";
import { useServices } from "../../../services-def";
import { PROJECT_REPORT } from "../routes";

interface ReportToolbarParams {
  projectId: string;
  selectedPath: string;
}

export function ReportToolbar() {
  const { projectId, selectedPath } = useParams<ReportToolbarParams>();
  const { t, dbTrans } = useDbTranslation(projectId);
  const { routes } = useServices();
  const { loading, data, error } =
    useFindReportDefinitionsFromProjectDetailsQuery({
      variables: {
        projectId,
      },
    });

  useLoaderEffect(error, loading);

  if (data === undefined) {
    return null;
  }

  const reportDefinitions = data.findProjectDetails.reportDefinitions;
  const links: DropdownItem[] = reportDefinitions.map((reportDefinition) => ({
    label: () => dbTrans(reportDefinition.name),
    key: reportDefinition.id,
    link: routes.render(PROJECT_REPORT, {
      projectId,
      reportDefinitionId: reportDefinition.id,
      selectedPath,
    }),
  }));

  return <DropdownButton label={t("project_reports.view")} items={links} />;
}
