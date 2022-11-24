import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { HeadCell, PaginatedDataGrid } from "../../../components/data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import {
  FindProjectDefinitionFormulasDocument,
  FindProjectDefinitionFormulasQuery,
  FindProjectDefinitionFormulasQueryVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useApolloPageFetch } from "../../../shared/async-cursor";
import { PROJECT_DEFINITION_EDITOR_FORMULA_EDIT } from "../routes";

interface FormulasSearchParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

type Result =
  FindProjectDefinitionFormulasQuery["results"]["edges"][number]["node"];

const headers: HeadCell<Result>[] = [
  {
    id: "name",
    label: "name",
    render: FormulaLink,
  },
  {
    id: "expression",
    label: "expression",
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

interface FormulasSearchParams {
  projectDefinitionId: string;
}

export function FormulasSearch() {
  const { apollo } = useServices();
  const { onError } = useLoadingNotifier();
  const { projectDefinitionId } = useParams<FormulasSearchParams>();
  const fetch = useApolloPageFetch<
    Result,
    FindProjectDefinitionFormulasQuery,
    FindProjectDefinitionFormulasQueryVariables
  >({
    apollo,
    onError,
    document: FindProjectDefinitionFormulasDocument,
    variables: {
      projectDefinitionId,
    },
  });

  return <PaginatedDataGrid<Result> fetch={fetch} headers={headers} />;
}
