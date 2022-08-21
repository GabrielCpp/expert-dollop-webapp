import { useMemo } from "react";
import { Link } from "react-router-dom";
import { HeadCell, PaginatedDataGrid } from "../../../components/data-grid";
import { apolloClientFetch } from "../../../components/data-grid/paginated-data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import {
  FindProjectDefintionsDocument,
  FindProjectDefintionsQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";

type Result = FindProjectDefintionsQuery["results"]["edges"][number]["node"];

const headers: HeadCell<Result>[] = [
  {
    disablePadding: false,
    id: "name",
    label: "name",
    numeric: false,
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

export function ProjectDefinitionHome() {
  const { apollo } = useServices();
  const { onError } = useLoadingNotifier();
  const fetch = useMemo(
    () =>
      apolloClientFetch<Result>(apollo, FindProjectDefintionsDocument, onError),
    [apollo, onError]
  );

  return <PaginatedDataGrid fetch={fetch} headers={headers} />;
}
