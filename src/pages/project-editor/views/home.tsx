import { Link } from "react-router-dom";
import { HeadCell, PaginatedDataGrid } from "../../../components/data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import {
  FindProjectsDocument,
  FindProjectsQuery,
  FindProjectsQueryVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useApolloPageFetch } from "../../../shared/async-cursor";
import { PROJECT_EDITOR } from "../routes";

interface ProjectDefinitionItem {
  id: string;
  name: string;
}

const headers: HeadCell<ProjectDefinitionItem>[] = [
  {
    id: "name",
    label: "name",
    render: ProjectLink,
  },
];

function ProjectLink({ data }: { data: ProjectDefinitionItem }) {
  const { routes } = useServices();
  return (
    <Link
      to={routes.render(PROJECT_EDITOR, {
        projectId: data.id,
        selectedPath: "~",
      })}
    >
      {data.name}
    </Link>
  );
}

type Result = FindProjectsQuery["results"]["edges"][number]["node"];

export function ProjectSearchHome() {
  const { apollo } = useServices();
  const { onError } = useLoadingNotifier();
  const fetch = useApolloPageFetch<
    Result,
    FindProjectsQuery,
    FindProjectsQueryVariables
  >({
    apollo,
    onError,
    document: FindProjectsDocument,
  });

  return <PaginatedDataGrid<Result> fetch={fetch} headers={headers} />;
}
