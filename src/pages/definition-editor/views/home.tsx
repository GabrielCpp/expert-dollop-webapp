import { Link } from "react-router-dom";
import { HeadCell, PaginatedDataGrid } from "../../../components/data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import {
  FindProjectDefintionsDocument,
  FindProjectDefintionsQuery,
  FindProjectDefintionsQueryVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useApolloPageFetch } from "../../../shared/async-cursor";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";

const headers: HeadCell<Result>[] = [
  {
    id: "name",
    label: "name",
    render: ProjectDefinitionLink,
  },
];

function ProjectDefinitionLink({ data }: { data: Result }) {
  const { routes } = useServices();
  return (
    <Link
      to={routes.render(PROJECT_DEFINITION_EDITOR_MAIN, {
        projectDefinitionId: data.id,
        selectedPath: "~",
      })}
    >
      {data.name}
    </Link>
  );
}

type Result = FindProjectDefintionsQuery["results"]["edges"][number]["node"];

export function ProjectDefinitionHome() {
  const { apollo } = useServices();
  const { onError } = useLoadingNotifier();
  const fetch = useApolloPageFetch<
    Result,
    FindProjectDefintionsQuery,
    FindProjectDefintionsQueryVariables
  >({
    apollo,
    onError,
    document: FindProjectDefintionsDocument,
  });

  return <PaginatedDataGrid<Result> fetch={fetch} headers={headers} />;
}
