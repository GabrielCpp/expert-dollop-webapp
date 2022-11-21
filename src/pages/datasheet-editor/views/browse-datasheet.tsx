import { Link } from "react-router-dom";
import { HeadCell, PaginatedDataGrid } from "../../../components/data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import {
  FindDatasheetsDocument,
  FindDatasheetsQuery,
  FindDatasheetsQueryVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useApolloPageFetch } from "../../../shared/async-cursor";
import { DATASHEET_EDITOR } from "../routes";

type Result = FindDatasheetsQuery["results"]["edges"][number]["node"];

const headers: HeadCell<Result>[] = [
  {
    disablePadding: false,
    id: "name",
    label: "name",
    numeric: false,
    render: DatasheetLink,
  },
];

export function BrowseDatasheet() {
  const { apollo } = useServices();
  const { onError } = useLoadingNotifier();
  const fetch = useApolloPageFetch<
    Result,
    FindDatasheetsQuery,
    FindDatasheetsQueryVariables
  >({
    apollo,
    onError,
    document: FindDatasheetsDocument,
  });

  return <PaginatedDataGrid<Result> fetch={fetch} headers={headers} />;
}

function DatasheetLink({ data }: { data: Result }) {
  const { routes } = useServices();
  return (
    <Link
      to={routes.render(DATASHEET_EDITOR, {
        datasheetId: data.id,
      })}
    >
      {data.name}
    </Link>
  );
}
