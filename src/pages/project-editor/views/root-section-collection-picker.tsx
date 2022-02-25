import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { HeadCell, InMemoryDataGrid } from "../../../components/data-grid";
import { useFindProjectRootSectionsQuery } from "../../../generated";
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
    numeric: false,
    disablePadding: true,
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

export default function RootSectionCollectionPicker() {
  const { projectId, rootTypeId } =
    useParams<RootSectionCollectionPickerParams>();
  const { data } = useFindProjectRootSectionsQuery({
    variables: {
      projectId: projectId,
    },
  });

  if (data === undefined) {
    return null;
  }

  const roots = data.findProjectRootSections.roots;
  const rows: CollectionItem[] =
    roots
      .find((x) => x.definition.id === rootTypeId)
      ?.nodes.map((node) => ({
        label: node.node.label || null,
        id: node.node.id,
      })) || [];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <InMemoryDataGrid<CollectionItem>
        rows={rows}
        headers={headCells}
        searchRow={(query, x) => x.label?.includes(query) || false}
      />
    </div>
  );
}
