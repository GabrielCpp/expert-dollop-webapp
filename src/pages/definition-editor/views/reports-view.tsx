import { Grid } from "@mui/material";
import { head } from "lodash";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useMethods } from "react-use";

import { AddButtonLink, DeleteIconButton } from "../../../components/buttons";
import {
  BOOLEAN_VALIDATOR,
  Field,
  Form,
  FormArray,
  FormSection,
  IdGenerator,
  queryFieldsByTag,
  SelectField,
  SelectOption,
  STRING_VALIDATOR,
  switchField,
  textField,
  useField,
  useFieldTag,
  useForm,
} from "../../../components/table-fields";
import { AcceptableChild } from "../../../components/table-fields/helpers";
import {
  FieldArrayElement,
  OnInsert,
  UseFieldArray,
} from "../../../components/table-fields/hooks/use-field-array";
import { TagMetadata } from "../../../components/table-fields/hooks/use-field-tag";
import {
  ReportComputation,
  ReportJoin,
  ReportViewQuery,
  useReportViewQuery,
} from "../../../generated";
import { useTableQuery } from "../../../shared/redux-db";

interface ReportViewParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function ReportView() {
  const { projectDefinitionId } = useParams<ReportViewParams>();
  const { data } = useReportViewQuery({ variables: { projectDefinitionId } });
  const { formPath } = useForm();

  async function save(v: any) {
    console.log(v);
  }

  if (data === undefined) {
    return null;
  }

  return (
    <Form formPath={formPath} label={"Hello"} save={save}>
      <ReportForm
        formPath={formPath}
        collections={data.findDefinitionAggregateCollections}
      ></ReportForm>
    </Form>
  );
}

interface ReportFormProps {
  formPath: string[];
  collections: ReportViewQuery["findDefinitionAggregateCollections"];
}

const labels = {
  selection: {
    form: {
      name: "selection",
    },
    datasheetPicker: {
      name: "fromCollectionId",
      label: "",
    },
    alias: {
      name: "fromAlias",
      label: "",
      defaultValue: "",
    },
    joins: {
      form: {
        name: "selection",
      },
      fromObjectName: {
        name: "fromObjectName",
      },
      reportJoin: {
        name: "joinCache",
      },
    },
  },
};

interface AttributeBucketOption extends SelectOption {
  aggregateId: string;
  aggregateName: string;
  attributeName: string;
}

interface JoinOptionBucket {
  fromOptions: AttributeBucketOption[];
  onOptions: AttributeBucketOption[];
}

interface State {
  availableBucket: JoinOptionBucket;
  perFieldsOptions: Record<
    string,
    {
      aggregateId: string;
      attributeName: string;
      bucket: JoinOptionBucket;
    }
  >;
}

type Collections = ReportViewQuery["findDefinitionAggregateCollections"];
type Collection = Collections[number];

function buildOption(collection?: Collection): AttributeBucketOption[] {
  if (collection === undefined) {
    return [];
  }

  return collection.attributesSchema.map((x) => ({
    aggregateId: collection.id,
    aggregateName: collection.name,
    attributeName: x.name,
    id: `${collection.name}.${x.name}`,
    label: `${collection.name}.${x.name}`,
  }));
}

function buildInitialState(
  collections: Collections,
  abstractAggregateId: string
): State {
  return {
    availableBucket: {
      fromOptions: buildOption(
        collections.find((x) => x.id === abstractAggregateId)
      ),
      onOptions: collections
        .filter((x) => !x.isAbstract)
        .flatMap((x) => buildOption(x)),
    },
    perFieldsOptions: {},
  };
}

interface Methods {
  addJoin(elementId: string): void;
}

function createMethods(state: State) {
  function addJoin(elementId: string): State {
    return {
      ...state,
      perFieldsOptions: {
        ...state.perFieldsOptions,
        [elementId]: {
          aggregateId: "",
          attributeName: "",
          bucket: state.availableBucket,
        },
      },
    };
  }

  return {
    addJoin,
  };
}

export function useExclusiveOptions(
  collections: Collections,
  abstractAggregateId: string
): [State, Methods] {
  const [inititalState] = useState<State>(() =>
    buildInitialState(collections, abstractAggregateId)
  );
  const reducers = useMethods(createMethods, inititalState);
  return reducers;
}

function ReportForm({ formPath, collections }: ReportFormProps) {
  return (
    <div>
      <Selection parentPath={formPath} collections={collections} />
    </div>
  );
}

interface SelectionProps {
  parentPath: string[];
  collections: Collections;
}

function Selection({ collections, parentPath }: SelectionProps) {
  const options: SelectOption[] = collections
    .filter((x) => x.isAbstract)
    .map((x) => ({
      id: x.id,
      label: x.name,
    }));

  const { formPath } = useForm({
    parentPath,
    name: labels.selection.joins.form.name,
  });
  const { field } = useField({
    validator: STRING_VALIDATOR,
    defaultValue: head(options)?.id,
    name: labels.selection.datasheetPicker.name,
    path: formPath,
  });

  const fromJoinTag = useFieldTag();

  const collection = collections.find((x) => x.id === (field.value as string));

  if (collection === undefined) {
    return null;
  }

  return (
    <FormSection>
      <SelectField
        {...field}
        options={options}
        label={labels.selection.datasheetPicker.label}
        key={field.name}
      />
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        name={labels.selection.alias.name}
        defaultValue={labels.selection.alias.defaultValue}
        label={labels.selection.alias.name}
        key={labels.selection.alias.name}
        component={textField}
      />
      <FormArray<
        ReportJoin,
        {},
        { collection: Collection; fromJoinTag: TagMetadata }
      >
        parentPath={formPath}
        elementTemplate={ReportJoinForm}
        frameTemplate={ItemListTemplate}
        key={labels.selection.joins.reportJoin.name}
        frameProps={{}}
        elementProps={{ collection, fromJoinTag }}
        createElement={makeDefaultReportJoin}
      ></FormArray>
    </FormSection>
  );
}

interface ItemListTemplateProps<T> extends Omit<UseFieldArray<T>, "elements"> {
  children: AcceptableChild;
  blankSlate?: () => JSX.Element | null;
}

function ItemListTemplate<T>({
  children,
  remove,
  insert,
  blankSlate: BlankSlate,
}: ItemListTemplateProps<T>) {
  const elements: JSX.Element[] = (
    Array.isArray(children) ? children : [children]
  ).filter((x) => x !== null) as JSX.Element[];

  const firstElement =
    elements.length === 0 && BlankSlate ? <BlankSlate /> : null;

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      {firstElement}
      {elements.map((element) => (
        <Grid
          key={element.key}
          container
          item
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xl={11} md={11} xs={11}>
            {element}
          </Grid>
          <Grid item xl={1} md={1} xs={1}>
            <DeleteIconButton
              onClick={() => remove(element.props.children.id)}
            />
          </Grid>
        </Grid>
      ))}
      <Grid
        item
        container
        direction="column"
        alignItems="stretch"
        xl={12}
        md={12}
        xs={12}
      >
        <AddButtonLink onClick={() => insert()}></AddButtonLink>
      </Grid>
    </Grid>
  );
}

interface ReportJoinProps<T> {
  children: UseFieldArray<T>["elements"][number];
  parentPath: string[];
  collection: Collection;
  fromJoinTag: { tag: string };
}

function ReportJoinForm<T>({
  children: element,
  parentPath,
  collection,
  fromJoinTag,
}: ReportJoinProps<T>) {
  const { formPath } = useForm({
    name: labels.selection.joins.reportJoin.name,
    parentPath,
    metadata: element.metadata,
  });

  const results = useTableQuery(queryFieldsByTag(fromJoinTag.tag));

  return (
    <FormSection>
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        name={labels.selection.alias.name}
        defaultValue={labels.selection.alias.defaultValue}
        label={labels.selection.alias.name}
        component={textField}
      />
      <Field
        validator={STRING_VALIDATOR}
        defaultValue={head(bucket.fromOptions)?.id}
        path={formPath}
        name={labels.selection.datasheetPicker.name}
        label={labels.selection.datasheetPicker.label}
        options={bucket.fromOptions}
        component={SelectField}
        metadata={fromJoinTag}
      />
      <Field
        validator={STRING_VALIDATOR}
        defaultValue={head(bucket.onOptions)?.id}
        path={formPath}
        name={labels.selection.datasheetPicker.name}
        label={labels.selection.datasheetPicker.label}
        options={bucket.onOptions}
        component={SelectField}
      />
    </FormSection>
  );
}

function makeDefaultReportJoin(): ReportJoin {
  return {
    aliasName: "",
    fromObjectName: "",
    fromPropertyName: "",
    joinOnAttribute: "",
    joinOnCollection: "",
    allowDicardElement: false,
    sameCardinality: false,
    warnAboutIdleItems: false,
  };
}

interface ReportComputationFormProps<T> {
  children: UseFieldArray<T>["elements"][number];
  parentPath: string[];
}

function ReportComputationForm<T>({
  children: element,
  parentPath,
}: ReportComputationFormProps<T>) {
  const { formPath } = useForm({
    name: labels.selection.joins.reportJoin.name,
    parentPath,
    metadata: element.metadata,
  });

  return (
    <FormSection>
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        name={labels.selection.alias.name}
        defaultValue={labels.selection.alias.defaultValue}
        label={labels.selection.alias.name}
        component={textField}
      />
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        name={labels.selection.alias.name}
        defaultValue={labels.selection.alias.defaultValue}
        label={labels.selection.alias.name}
        component={textField}
      />
      <Field
        validator={BOOLEAN_VALIDATOR}
        defaultValue={false}
        path={formPath}
        name="isReadonly"
        key="isReadonly"
        label="isReadonly"
        component={switchField}
      />
    </FormSection>
  );
}
