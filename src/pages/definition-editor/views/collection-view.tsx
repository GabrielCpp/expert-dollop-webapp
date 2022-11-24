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
import { head } from "lodash";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddButtonLinkFullWidth,
  EditIconButtonLink,
} from "../../../components/buttons";
import { PaginatedDataGrid } from "../../../components/data-grid";
import {
  CrudView,
  HeadCell,
} from "../../../components/data-grid/paginated-data-grid";
import { useLoadingNotifier } from "../../../components/loading-frame";
import {
  AggregateInput,
  FindAggregatesDocument,
  FindAggregatesQuery,
  FindAggregatesQueryVariables,
  FindDefinitionAggregateCollectionsQuery,
  useAddAggregateMutation,
  useFindDefinitionAggregateCollectionsQuery,
  useUpdateAggregateMutation,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useApolloPageFetch } from "../../../shared/async-cursor";
import { CONFIG_INSTANCIATIONS } from "../mappings/config-mapping";
import { FIELD_VALUE_TO_INPUT } from "../mappings/field-value-mapping";
import {
  DEFINITION_AGGREGATE_COLLECTION_ADD,
  DEFINITION_AGGREGATE_COLLECTION_EDIT,
} from "../routes";

type Collection =
  FindDefinitionAggregateCollectionsQuery["findDefinitionAggregateCollections"][number];

interface LabelEditionViewParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function LabelEditionView() {
  const params = useParams<LabelEditionViewParams>();
  const { onError } = useLoadingNotifier();
  const [currentCollection, setCurrentCollection] = useState<
    Collection | undefined
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

  const firtCollection = head(data.findDefinitionAggregateCollections);
  if (firtCollection !== undefined && currentCollection === undefined) {
    setCurrentCollection(firtCollection);
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
            collection={currentCollection}
          />
        )}
      </Grid>
    </Grid>
  );
}

type Result = FindAggregatesQuery["results"]["edges"][number]["node"];

interface AggregatesTableProps {
  projectDefinitionId: string;
  collection: Collection;
}

function AggregatesTable({
  projectDefinitionId,
  collection,
}: AggregatesTableProps) {
  const { apollo, routes } = useServices();
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
      collectionId: collection.id,
    },
  });

  const [addAggregate] = useAddAggregateMutation();

  async function addAggregateFromTable(aggregate: AggregateInput) {
    await addAggregate({
      variables: {
        projectDefinitionId,
        collectionId: collection.id,
        aggregate,
      },
    });
  }

  const [updateAggregate] = useUpdateAggregateMutation();

  async function updateAggregateFromTable(
    aggregateId: string,
    aggregate: AggregateInput
  ) {
    await updateAggregate({
      variables: {
        projectDefinitionId,
        collectionId: collection.id,
        aggregateId,
        aggregate,
      },
    });
  }

  async function deleteAggregatesFromTable(ids: string[]) {}

  const headers: HeadCell<Result>[] = [
    {
      id: "name",
      label: "name",
      render: ({ data }) => <Typography>{data.name}</Typography>,
    },
    {
      id: "ordinal",
      label: "ordinal",
      render: ({ data }) => <Typography>{data.ordinal}</Typography>,
    },
    {
      id: "isExtendable",
      label: "isExtendable",
      render: ({ data }) => <Typography>{data.isExtendable}</Typography>,
    },
    ...collection.attributesSchema.map((c) => ({
      id: c.name,
      label: c.name,
      render: ({ data }: { data: Result }) => (
        <Typography>
          {data.attributes.find((x) => x.name === c.name)?.value.__typename}
        </Typography>
      ),
    })),
  ];

  const creationHeaders: HeadCell<AggregateInput>[] = [
    {
      id: "name",
      label: "name",
      render: ({ data }) => <Typography>{data.name}</Typography>,
    },
    {
      id: "ordinal",
      label: "ordinal",
      render: ({ data }) => <Typography>{data.ordinal}</Typography>,
    },
    {
      id: "isExtendable",
      label: "isExtendable",
      render: ({ data }) => <Typography>{data.isExtendable}</Typography>,
    },
    ...collection.attributesSchema.map((c) => ({
      id: c.name,
      label: c.name,
      render: ({ data }: { data: AggregateInput }) => (
        <Typography>
          {data.attributes.find((x) => x.name === c.name)?.value.kind}
        </Typography>
      ),
    })),
  ];

  function makeDefaultRow(): AggregateInput {
    return {
      isExtendable: false,
      name: "",
      ordinal: 0,
      attributes: collection.attributesSchema.map((a) => ({
        isReadonly: false,
        name: a.name,
        value: CONFIG_INSTANCIATIONS[a.details.__typename](a.details),
      })),
    };
  }

  const crudView: CrudView<Result, AggregateInput> = {
    creation: {
      label: "create",
      makeDefaultRow,
      create: addAggregateFromTable,
      columns: creationHeaders,
    },
    edition: {
      label: "edit",
      update: updateAggregateFromTable,
      columns: creationHeaders,
      convertToEditable: (d) => ({
        isExtendable: d.isExtendable,
        name: d.name,
        ordinal: d.ordinal,
        attributes: d.attributes.map((a) => ({
          isReadonly: a.isReadonly,
          name: a.name,
          value: FIELD_VALUE_TO_INPUT[a.value.__typename](a.value),
        })),
      }),
    },
    deletion: {
      label: "delete",
      delete: deleteAggregatesFromTable,
    },
  };

  return (
    <PaginatedDataGrid<Result, AggregateInput>
      fetch={fetch}
      headers={headers}
      crud={crudView}
    />
  );
}

interface AggregateCollectionListProps {
  params: LabelEditionViewParams;
  collections: FindDefinitionAggregateCollectionsQuery;
  setCurrentCollection: (c: Collection) => void;
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
              <ListItemButton onClick={() => setCurrentCollection(collection)}>
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
