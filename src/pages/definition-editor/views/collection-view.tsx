import {
  Box,
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
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
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
  BOOLEAN_VALIDATOR,
  checkboxField,
  createFormTheme,
  Field,
  FormThemeContext,
  HiddenField,
  INT_VALIDATOR,
  NamedFormSection,
  saveForm,
  switchField,
  textField,
  USER_STRING_VALIDATOR,
} from "../../../components/table-fields";
import {
  AggregateInput,
  FindAggregatesDocument,
  FindAggregatesQuery,
  FindAggregatesQueryVariables,
  FindDefinitionAggregateCollectionsQuery,
  useAddAggregateMutation,
  useDeleteAggregateMutation,
  useFindDefinitionAggregateCollectionsQuery,
  useUpdateAggregateMutation,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useApolloPageFetch } from "../../../shared/async-cursor";
import { MULTI_LANGUAGE_FIELD } from "../form-definitions";
import { MultiLanguageField } from "../forms/multi-language-field";
import { CONFIG_INSTANCIATIONS } from "../mappings/config-mapping";
import {
  FIELD_VALUE_TO_INPUT,
  VALUE_COMPONENT_FACTORIES,
  VALUE_FORM_COMPONENT_FACTORIES,
} from "../mappings/field-value-mapping";
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
      <Grid item xs={4} md={2} xl={2} style={{ minWidth: "4em" }}>
        <AggregateCollectionList
          collections={data}
          params={params}
          setCurrentCollection={setCurrentCollection}
        />
      </Grid>
      <Grid item xs={12} md={10} xl={10}>
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
  const [formTheme] = useState(() => createFormTheme({ size: "small" }));
  const { t } = useTranslation();
  const { apollo, reduxDb, ajv, loader } = useServices();
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
  const addAggregateFromTable = useCallback(
    (id: string) =>
      saveForm(
        { reduxDb, ajv, loader },
        id,
        async (aggregate: AggregateInput) => {
          await addAggregate({
            variables: {
              projectDefinitionId,
              collectionId: collection.id,
              aggregate,
            },
          });
        }
      ),
    [reduxDb, ajv, loader, addAggregate]
  );

  const [updateAggregate] = useUpdateAggregateMutation();
  const updateAggregateFromTable = useCallback(
    (aggregateId: string) =>
      saveForm(
        { reduxDb, ajv, loader },
        aggregateId,
        async (aggregate: AggregateInput) => {
          await updateAggregate({
            variables: {
              projectDefinitionId,
              collectionId: collection.id,
              aggregateId,
              aggregate,
            },
          });
        }
      ),
    [reduxDb, ajv, loader, updateAggregate]
  );

  const [deleteAggregate] = useDeleteAggregateMutation();

  async function deleteAggregatesFromTable(ids: string[]) {
    for (const aggregateId of ids) {
      await deleteAggregate({
        variables: {
          projectDefinitionId,
          collectionId: collection.id,
          aggregateId,
        },
      });
    }
  }

  const headers: HeadCell<Result>[] = [
    {
      id: "name",
      label: "name",
      render: ({ data }) => <Typography>{data.name}</Typography>,
    },
    {
      id: "translated",
      label: "translated",
      render: ({ id, data }) => {
        return (
          <ul key={id}>
            {data.translated.map((translation) => (
              <li key={translation.id}>
                <Typography>
                  {translation.locale}:{translation.value}
                </Typography>
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      id: "ordinal",
      label: "ordinal",
      render: ({ data }) => <Typography>{data.ordinal}</Typography>,
    },
    {
      id: "isExtendable",
      label: "isExtendable",
      render: ({ data }) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>{data.isExtendable}</Typography>
        </Box>
      ),
    },
    ...collection.attributesSchema.map((c) => ({
      id: c.name,
      label: c.name,
      render: ({ data }: { data: Result }) =>
        VALUE_COMPONENT_FACTORIES[c.details.__typename](
          data.attributes.find((x) => x.name === c.name)?.value || null,
          c.details
        ),
    })),
  ];

  const creationHeaders: HeadCell<AggregateInput>[] = [
    {
      id: "name",
      label: "name",
      render: ({ id, data }) => (
        <Field
          id={`${id}-name`}
          validator={USER_STRING_VALIDATOR}
          defaultValue={data.name}
          path={[id]}
          name="name"
          t={t}
          component={textField}
          textProps={{
            size: "small",
          }}
        />
      ),
    },
    {
      id: "translated",
      label: "translated",
      render: ({ id, data }) => {
        return (
          <Box sx={{ m: 0.5 }}>
            <MultiLanguageField
              parentPath={[id]}
              name="translated"
              nameId={`${id}-name`}
              translations={data.translated}
              labels={MULTI_LANGUAGE_FIELD}
              helpTextTranslationKeyName={`${data.name}_help_text`}
              labelTranslationKeyName={data.name}
              t={t}
            />
          </Box>
        );
      },
    },
    {
      id: "ordinal",
      label: "ordinal",
      render: ({ id, data }) => (
        <Field
          validator={INT_VALIDATOR}
          defaultValue={data.ordinal}
          path={[id]}
          name="ordinal"
          t={t}
          component={textField}
          textProps={{
            size: "small",
          }}
        />
      ),
    },
    {
      id: "isExtendable",
      label: "isExtendable",
      render: ({ id, data }) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Field
            validator={BOOLEAN_VALIDATOR}
            defaultValue={data.isExtendable}
            path={[id]}
            name="isExtendable"
            t={t}
            component={checkboxField}
            checkboxProps={{
              size: "small",
            }}
          />
        </Box>
      ),
    },
    ...collection.attributesSchema.map((c, index) => ({
      id: c.name,
      label: c.name,
      render: ({ id, data }: { id: string; data: AggregateInput }) => (
        <Box sx={{ m: 0.5 }}>
          <NamedFormSection
            name="attributes"
            ordinal={index}
            parentPath={id}
            spacing={0}
            padding={0}
          >
            {(p) => [
              VALUE_FORM_COMPONENT_FACTORIES[c.details.__typename](
                p,
                data.attributes.find((x) => x.name === c.name)?.value || null,
                c.details
              ),
              <HiddenField
                name="name"
                key="name"
                parentPath={p}
                value={c.name}
              />,
              <Field
                validator={BOOLEAN_VALIDATOR}
                defaultValue={false}
                path={p}
                name="isReadonly"
                key="isReadonly"
                label="isReadonly"
                t={t}
                component={switchField}
              />,
            ]}
          </NamedFormSection>
        </Box>
      ),
    })),
  ];

  function makeDefaultRow(): AggregateInput {
    return {
      isExtendable: false,
      name: "",
      ordinal: 0,
      translated: [],
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
        translated: [],
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
    <FormThemeContext.Provider value={formTheme}>
      <PaginatedDataGrid<Result, AggregateInput>
        fetch={fetch}
        headers={headers}
        crud={crudView}
      />
    </FormThemeContext.Provider>
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
