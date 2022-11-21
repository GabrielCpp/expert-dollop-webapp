import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddButtonLinkFullWidth,
  EditIconButtonLink,
} from "../../../components/buttons";
import { PaginatedDataGrid } from "../../../components/data-grid";
import { HeadCell } from "../../../components/data-grid/paginated-data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import {
  FindAggregatesDocument,
  FindAggregatesQuery,
  FindAggregatesQueryVariables,
  FindDefinitionAggregateCollectionsQuery,
  useFindDefinitionAggregateCollectionsQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useApolloPageFetch } from "../../../shared/async-cursor";
import {
  DEFINITION_AGGREGATE_COLLECTION_ADD,
  DEFINITION_AGGREGATE_COLLECTION_EDIT,
} from "../routes";

interface LabelEditionViewParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function LabelEditionView() {
  const params = useParams<LabelEditionViewParams>();
  const { onError } = useLoadingNotifier();
  const [currentCollection, setCurrentCollection] = useState<
    string | undefined
  >(undefined);
  const { data } = useFindDefinitionAggregateCollectionsQuery({
    onError,
    variables: {
      projectDefinitionId: params.projectDefinitionId,
    },
  });

  if (data === undefined) {
    return null;
  }

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12} md={4} xl={4} style={{ minWidth: "4em" }}>
        <AggregateCollectionList
          collections={data}
          params={params}
          setCurrentCollection={setCurrentCollection}
        />
      </Grid>
      <Grid item xs={12} md={8} xl={6}>
        {currentCollection && (
          <AggregatesTable
            projectDefinitionId={params.projectDefinitionId}
            collectionId={currentCollection}
          />
        )}
      </Grid>
    </Grid>
  );
}

type Result = FindAggregatesQuery["results"]["edges"][number]["node"];

interface AggregatesTableProps {
  projectDefinitionId: string;
  collectionId: string;
}

function AggregatesTable({
  projectDefinitionId,
  collectionId,
}: AggregatesTableProps) {
  const { apollo } = useServices();
  const { onError } = useLoadingNotifier();
  const fetch = useApolloPageFetch<
    Result,
    FindAggregatesQuery,
    FindAggregatesQueryVariables
  >({
    apollo,
    onError,
    document: FindAggregatesDocument,
    variables: {
      projectDefinitionId: projectDefinitionId,
      collectionId: collectionId,
    },
  });

  const headers: HeadCell<Result>[] = [
    {
      disablePadding: false,
      id: "name",
      label: "name",
      numeric: false,
      render: ({ data }) => <Typography>{data.name}</Typography>,
    },
    {
      disablePadding: false,
      id: "isExtendable",
      label: "isExtendable",
      numeric: false,
      render: ({ data }) => <Typography>{data.isExtendable}</Typography>,
    },
  ];
  return <PaginatedDataGrid<Result> fetch={fetch} headers={headers} />;
}

interface AggregateCollectionListProps {
  params: LabelEditionViewParams;
  collections: FindDefinitionAggregateCollectionsQuery;
  setCurrentCollection: (id: string) => void;
}

function AggregateCollectionList({
  params,
  collections,
  setCurrentCollection,
}: AggregateCollectionListProps) {
  const { routes } = useServices();

  return (
    <Card>
      <CardContent style={{ padding: "0" }}>
        <List>
          {collections.findDefinitionAggregateCollections.map((collection) => (
            <ListItem disablePadding key={collection.id}>
              <ListItemButton
                onClick={() => setCurrentCollection(collection.id)}
              >
                <ListItemText primary={collection.name} />
                <EditIconButtonLink
                  size="small"
                  title="shared.buttons.edit"
                  to={routes.render(DEFINITION_AGGREGATE_COLLECTION_EDIT, {
                    ...params,
                    collectionId: collection.id,
                  })}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <AddButtonLinkFullWidth
              label="definition_editor.side_panel.add_new_sub_section"
              to={routes.render(DEFINITION_AGGREGATE_COLLECTION_ADD, params)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
