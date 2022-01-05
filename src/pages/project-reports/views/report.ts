import { useParams } from "react-router-dom";

interface ReportParams extends Record<string, string> {
  projectId: string;
  reportDefinitionId: string;
}

function Report() {
  const { projectId, selectedPath } = useParams<ReportParams>();
}
