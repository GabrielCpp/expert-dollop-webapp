import { Grid } from "@mui/material";
import { head } from "lodash";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { resolveHookState } from "react-use/lib/misc/hookState";

import { AddButtonLink, DeleteIconButton } from "../../../components/buttons";
import {
  BOOLEAN_VALIDATOR,
  Field,
  Form,
  FormArray,
  FormSection,
  SelectField,
  STRING_VALIDATOR,
  switchField,
  InlineTextField,
  useField,
  useForm,
} from "../../../components/table-fields";
import { FormFieldRecord } from "../../../components/table-fields/form-field-record";
import { AcceptableChild } from "../../../components/table-fields/helpers";
import { UseFieldArray } from "../../../components/table-fields/hooks/use-field-array";
import { ReportJoin, useReportViewQuery } from "../../../generated";
import {
  Collections,
  DefaultOption,
  ReportViewReducerMethods,
  ReportViewState,
  useReportViewReducer,
} from "../reducers/report-view-reducer";

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
  collections: Collections;
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

function ReportForm({ formPath, collections }: ReportFormProps) {
  const [state, methods] = useReportViewReducer(collections);

  return (
    <div>
      <Selection parentPath={formPath} state={state} methods={methods} />
    </div>
  );
}

interface SelectionProps {
  parentPath: string[];
  state: ReportViewState;
  methods: ReportViewReducerMethods;
}

function Selection({ methods, state, parentPath }: SelectionProps) {
  const { formPath } = useForm({
    parentPath,
    name: labels.selection.joins.form.name,
  });
  const { field } = useField({
    validator: STRING_VALIDATOR,
    defaultValue: head(state.abstractCollection?.options)?.value,
    name: labels.selection.datasheetPicker.name,
    path: formPath,
    sideEffect: methods.updateAbstractCollection as (p: {
      value: unknown;
    }) => void,
  });

  function makeDefaultReportJoin(): ReportJoin {
    return {
      alias: "",
      fromBucket: {
        attributeName: "",
        bucketName: "",
      },
      onCollection: {
        attributeName: "",
        bucketName: "",
      },
    };
  }

  if (state.abstractCollection === undefined) {
    return null;
  }

  return (
    <FormSection>
      <SelectField
        {...field}
        options={state.abstractCollection.options}
        label={labels.selection.datasheetPicker.label}
        key={field.name}
      />
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        name={labels.selection.alias.name}
        defaultValue={state.abstractCollection.alias}
        label={labels.selection.alias.name}
        key={labels.selection.alias.name}
        component={InlineTextField}
      />
      <FormArray<
        ReportJoin,
        {},
        { state: ReportViewState; methods: ReportViewReducerMethods }
      >
        parentPath={formPath}
        elementTemplate={ReportJoinForm}
        frameTemplate={ItemListTemplate}
        key={labels.selection.joins.reportJoin.name}
        frameProps={{}}
        elementProps={{ state, methods }}
        createElement={makeDefaultReportJoin}
        afterInsert={methods.addJoin}
        afterRemove={methods.removeJoin}
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
              onClick={() => remove({ id: String(element.key) })}
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
  state: ReportViewState;
  methods: ReportViewReducerMethods;
}

function ReportJoinForm<T>({
  children: element,
  parentPath,
  state,
  methods,
}: ReportJoinProps<T>) {
  const { formPath } = useForm({
    name: labels.selection.joins.reportJoin.name,
    parentPath,
    metadata: element.metadata,
  });

  const bucket = state.elementOptions[element.id];

  const updateAliasName = useCallback(
    (record: FormFieldRecord) => {
      methods.updateAliasName({
        elementId: element.id,
        alias: record.value as string,
      });
    },
    [methods, element]
  );

  const { field: aliasField } = useField({
    validator: STRING_VALIDATOR,
    path: formPath,
    name: labels.selection.alias.name,
    defaultValue: bucket.fromOptionSelected.collection?.name || "",
    sideEffect: updateAliasName,
  });

  const updateJoinFrom = useCallback(
    (record: FormFieldRecord) => {
      methods.updateJoinFrom({
        elementId: element.id,
        option: bucket.fromOptions.find((x) => x.value === record.value),
      });
    },
    [methods, element, bucket]
  );

  const { field: fromCollectionField } = useField({
    validator: STRING_VALIDATOR,
    path: formPath,
    name: labels.selection.datasheetPicker.name,
    defaultValue: bucket.fromOptionSelected.value,
    sideEffect: updateJoinFrom,
  });

  const updateJoinTo = useCallback(
    (record: FormFieldRecord) => {
      methods.updateJoinFrom({
        elementId: element.id,
        option: bucket.fromOptions.find((x) => x.value === record.value),
      });
    },
    [methods, element, bucket]
  );

  const { field: toCollectionField } = useField({
    validator: STRING_VALIDATOR,
    path: formPath,
    name: labels.selection.datasheetPicker.name,
    defaultValue: bucket.toOptionSelected.value,
    sideEffect: updateJoinTo,
  });
  console.log(bucket);
  return (
    <FormSection>
      <InlineTextField {...aliasField} label={labels.selection.alias.name} />
      <SelectField
        {...fromCollectionField}
        key="from"
        label={labels.selection.datasheetPicker.label}
        options={bucket.fromOptions}
      />
      <SelectField
        {...toCollectionField}
        key="to"
        label={labels.selection.datasheetPicker.label}
        fallbackSelection={DefaultOption}
        options={bucket.toOptions}
      />
    </FormSection>
  );
}

interface ReportComputationFormProps<T> {
  children: UseFieldArray<T>["elements"][number];
  parentPath: string[];
  state: ReportViewState;
  methods: ReportViewReducerMethods;
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
        component={InlineTextField}
      />
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        name={labels.selection.alias.name}
        defaultValue={labels.selection.alias.defaultValue}
        label={labels.selection.alias.name}
        component={InlineTextField}
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
