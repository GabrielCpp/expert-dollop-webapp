import { Typography } from "@mui/material";
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { HeadCell, PaginatedDataGrid } from "../../../components/data-grid";
import {
  FindProjectRootSectionsQuery,
  useFindProjectRootSectionsQuery,
} from "../../../generated";
import { useArrayFetch } from "../../../shared/async-cursor";
import { buildLinkToProjectPath } from "../routes";

interface CollectionItem {
  id: string;
  label: string | null;
}

interface RootSectionCollectionPickerParams {
  projectId: string;
  rootTypeId: string;
}

const headCells: HeadCell<CollectionItem>[] = [
  {
    id: "label",
    label: "label",
    render: RootSectionLink,
  },
];

function RootSectionLink({ data }: { data: CollectionItem }) {
  const { projectId } = useParams<RootSectionCollectionPickerParams>();

  return (
    <Typography>
      <Link to={buildLinkToProjectPath(projectId, data.id)}>{data.label}</Link>
    </Typography>
  );
}

function getRows(
  rootTypeId: string,
  data?: FindProjectRootSectionsQuery
): CollectionItem[] {
  if (data === undefined) {
    return [];
  }

  const roots = data.findProjectRootSections.roots;
  const rows: CollectionItem[] =
    roots
      .find((x) => x.definition.id === rootTypeId)
      ?.nodes.map((node) => ({
        label: node.node.label || null,
        id: node.node.id,
      })) || [];

  return rows;
}

function matchItem(query: string, x: CollectionItem): boolean {
  return x.label?.includes(query) || false;
}

export default function RootSectionCollectionPicker() {
  const { projectId, rootTypeId } =
    useParams<RootSectionCollectionPickerParams>();
  const { data } = useFindProjectRootSectionsQuery({
    variables: {
      projectId: projectId,
    },
  });
  const fetcher = useArrayFetch<CollectionItem>({
    rows: getRows(rootTypeId, data),
    match: matchItem,
  });

  if (data === undefined) {
    return null;
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <PaginatedDataGrid<CollectionItem> fetch={fetcher} headers={headCells} />
    </div>
  );
}
