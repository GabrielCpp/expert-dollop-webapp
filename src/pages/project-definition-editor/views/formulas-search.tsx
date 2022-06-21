import { Typography } from "@mui/material";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { HeadCell, PaginatedDataGrid } from "../../../components/data-grid";
import { apolloClientFetch } from "../../../components/data-grid/paginated-data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import {
  FindProjectDefinitionFormulasDocument,
  FindProjectDefinitionFormulasQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { PROJECT_DEFINITION_EDITOR_FORMULA_EDIT } from "../routes";

interface FormulasSearchParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

type Result =
  FindProjectDefinitionFormulasQuery["results"]["edges"][number]["node"];

const headers: HeadCell<Result>[] = [
  {
    disablePadding: false,
    id: "name",
    label: "name",
    numeric: false,
    render: FormulaLink,
  },
  {
    disablePadding: false,
    id: "expression",
    label: "expression",
    numeric: false,
    render: ({ data }) => <Typography>{data.expression}</Typography>,
  },
];

function FormulaLink({ data }: { data: Result }) {
  const { routes } = useServices();
  const { projectDefinitionId, selectedPath } =
    useParams<FormulasSearchParams>();

  return (
    <Link
      to={routes.render(PROJECT_DEFINITION_EDITOR_FORMULA_EDIT, {
        projectDefinitionId,
        selectedPath,
        formulaId: data.id,
      })}
    >
      {data.name}
    </Link>
  );
}

export function FormulasSearch() {
  const { apollo } = useServices();
  const { onError } = useLoadingNotifier();
  const fetch = useMemo(
    () =>
      apolloClientFetch<Result>(
        apollo,
        FindProjectDefinitionFormulasDocument,
        onError
      ),
    [apollo, onError]
  );

  return <PaginatedDataGrid fetch={fetch} headers={headers} />;
}
