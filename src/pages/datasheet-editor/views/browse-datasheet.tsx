import { useMemo } from "react";
import { Link } from "react-router-dom";
import { HeadCell, PaginatedDataGrid } from "../../../components/data-grid";
import { apolloClientFetch } from "../../../components/data-grid/paginated-data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import { Datasheet, FindDatasheetsDocument } from "../../../generated";
import { useServices } from "../../../services-def";
import { DATASHEET_EDITOR } from "../routes";

const headers: HeadCell<Datasheet>[] = [
  {
    disablePadding: false,
    id: "name",
    label: "name",
    numeric: false,
    render: DatasheetLink,
  },
];

function DatasheetLink({ data }: { data: Datasheet }) {
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

export function BrowseDatasheet() {
  const { apollo } = useServices();
  const { onError } = useLoadingNotifier();
  const fetch = useMemo(
    () => apolloClientFetch<Datasheet>(apollo, FindDatasheetsDocument, onError),
    [apollo, onError]
  );

  return <PaginatedDataGrid fetch={fetch} headers={headers} />;
}
