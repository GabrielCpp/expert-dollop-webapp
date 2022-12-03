import { StaticUnionField } from "../../../components/table-fields";
import {
  AggregateReferenceConfig,
  BoolFieldConfig,
  BoolFieldValue,
  DecimalFieldConfig,
  DecimalFieldValue,
  FieldValueInput,
  FieldValueType,
  IntFieldConfig,
  IntFieldValue,
  NodeReferenceConfig,
  PrimitiveWithReferenceUnion,
  ReferenceId,
  StaticChoiceFieldConfig,
  StringFieldConfig,
  StringFieldValue,
} from "../../../generated";
import { BOOLEAN_VIEW_LABELS } from "../form-definitions";
import { AggregateReferenceFieldValueForm } from "../forms/values/aggregate-reference-field-value-form";
import { BoolFieldValueForm } from "../forms/values/bool-field-value-form";
import { DecimalFieldValueForm } from "../forms/values/decimal-field-value-form";
import { IntFieldValueForm } from "../forms/values/int-field-value-form";
import { NodeReferenceFieldValueForm } from "../forms/values/node-reference-field-value-form";
import { StaticChoiceFieldValueForm } from "../forms/values/static-choice-field-value";
import { StringFieldValueForm } from "../forms/values/string-field-value-form";
import { AggregateReferenceFieldValueView } from "../views/values/aggregate-reference-field-value-view";
import { BoolFieldValueView } from "../views/values/bool-field-value-view";
import { DecimalfieldValueView } from "../views/values/decimal-field-value-view";
import { IntFieldValueView } from "../views/values/int-field-value-view";
import { NodeReferenceFieldValueView } from "../views/values/node-reference-field-value-view";
import { StaticChoiceFieldValueView } from "../views/values/static-choice-field-view";
import { StringFieldValueView } from "../views/values/string-field-value-view";

export const FIELD_VALUE_TO_INPUT: Record<
  | "BoolFieldValue"
  | "DecimalFieldValue"
  | "IntFieldValue"
  | "ReferenceId"
  | "StringFieldValue",
  (
    v:
      | BoolFieldValue
      | DecimalFieldValue
      | IntFieldValue
      | ReferenceId
      | StringFieldValue
  ) => FieldValueInput
> = {
  BoolFieldValue: (v) => ({
    kind: FieldValueType.BOOL_FIELD_VALUE,
    bool: {
      enabled: (v as BoolFieldValue).enabled,
    },
  }),
  DecimalFieldValue: (v) => ({
    kind: FieldValueType.DECIMAL_FIELD_VALUE,
    decimal: {
      numeric: (v as DecimalFieldValue).numeric,
    },
  }),
  IntFieldValue: (v) => ({
    kind: FieldValueType.INT_FIELD_VALUE,
    int: {
      integer: (v as IntFieldValue).integer,
    },
  }),
  ReferenceId: (v) => ({
    kind: FieldValueType.REFERENCE_FIELD_VALUE,
    reference: {
      uuid: (v as ReferenceId).uuid,
    },
  }),
  StringFieldValue: (v) => ({
    kind: FieldValueType.STRING_FIELD_VALUE,
    string: {
      text: (v as StringFieldValue).text,
    },
  }),
};

export const VALUE_FORM_COMPONENT_FACTORIES: Record<
  | "AggregateReferenceConfig"
  | "BoolFieldConfig"
  | "DecimalFieldConfig"
  | "IntFieldConfig"
  | "NodeReferenceConfig"
  | "StaticChoiceFieldConfig"
  | "StringFieldConfig",
  (
    parentPath: string[],
    value: FieldValueInput | null,
    c:
      | AggregateReferenceConfig
      | BoolFieldConfig
      | DecimalFieldConfig
      | IntFieldConfig
      | NodeReferenceConfig
      | StaticChoiceFieldConfig
      | StringFieldConfig
  ) => JSX.Element | null
> = {
  BoolFieldConfig: (parentPath, value, c) =>
    value && (
      <StaticUnionField<"bool", FieldValueInput>
        name="value"
        key="value"
        fieldName="bool"
        parentPath={parentPath}
        value={value}
        component={(p) => (
          <BoolFieldValueForm {...p} config={c as BoolFieldConfig} />
        )}
      />
    ),
  DecimalFieldConfig: (parentPath, value, c) =>
    value && (
      <StaticUnionField<"decimal", FieldValueInput>
        name="value"
        key="value"
        fieldName="decimal"
        parentPath={parentPath}
        value={value}
        component={(p) => (
          <DecimalFieldValueForm {...p} config={c as DecimalFieldConfig} />
        )}
      />
    ),
  IntFieldConfig: (parentPath, value, c) =>
    value && (
      <StaticUnionField<"int", FieldValueInput>
        name="value"
        key="value"
        fieldName="int"
        parentPath={parentPath}
        value={value}
        component={(p) => (
          <IntFieldValueForm {...p} config={c as IntFieldConfig} />
        )}
      />
    ),
  StaticChoiceFieldConfig: (parentPath, value, c) =>
    value && (
      <StaticUnionField<"string", FieldValueInput>
        name="value"
        key="value"
        fieldName="string"
        parentPath={parentPath}
        value={value}
        component={(p) => (
          <StaticChoiceFieldValueForm
            {...p}
            config={c as StaticChoiceFieldConfig}
          />
        )}
      />
    ),
  StringFieldConfig: (parentPath, value, c) =>
    value && (
      <StaticUnionField<"string", FieldValueInput>
        name="value"
        key="value"
        fieldName="string"
        parentPath={parentPath}
        value={value}
        component={(p) => (
          <StringFieldValueForm {...p} config={c as StringFieldConfig} />
        )}
      />
    ),
  AggregateReferenceConfig: (parentPath, value, c) =>
    value && (
      <StaticUnionField<"reference", FieldValueInput>
        name="value"
        key="value"
        fieldName="reference"
        parentPath={parentPath}
        value={value}
        component={(p) => (
          <AggregateReferenceFieldValueForm
            {...p}
            config={c as AggregateReferenceConfig}
          />
        )}
      />
    ),
  NodeReferenceConfig: (parentPath, value, c) =>
    value && (
      <StaticUnionField<"reference", FieldValueInput>
        name="value"
        key="value"
        fieldName="reference"
        parentPath={parentPath}
        value={value}
        component={(p) => (
          <NodeReferenceFieldValueForm
            {...p}
            config={c as NodeReferenceConfig}
          />
        )}
      />
    ),
};

export const VALUE_COMPONENT_FACTORIES: Record<
  | "AggregateReferenceConfig"
  | "BoolFieldConfig"
  | "DecimalFieldConfig"
  | "IntFieldConfig"
  | "NodeReferenceConfig"
  | "StaticChoiceFieldConfig"
  | "StringFieldConfig",
  (
    value: PrimitiveWithReferenceUnion | null,
    c:
      | AggregateReferenceConfig
      | BoolFieldConfig
      | DecimalFieldConfig
      | IntFieldConfig
      | NodeReferenceConfig
      | StaticChoiceFieldConfig
      | StringFieldConfig
  ) => JSX.Element | null
> = {
  BoolFieldConfig: (value, c) => (
    <BoolFieldValueView
      value={(value as BoolFieldValue) || undefined}
      config={c as BoolFieldConfig}
      labels={BOOLEAN_VIEW_LABELS}
    />
  ),
  DecimalFieldConfig: (value, c) => (
    <DecimalfieldValueView
      value={(value as DecimalFieldValue) || undefined}
      config={c as DecimalFieldConfig}
    />
  ),
  IntFieldConfig: (value, c) => (
    <IntFieldValueView
      value={(value as IntFieldValue) || undefined}
      config={c as IntFieldConfig}
    />
  ),
  StaticChoiceFieldConfig: (value, c) => (
    <StaticChoiceFieldValueView
      value={(value as StringFieldValue) || undefined}
      config={c as StaticChoiceFieldConfig}
    />
  ),
  StringFieldConfig: (value, c) => (
    <StringFieldValueView
      value={(value as StringFieldValue) || undefined}
      config={c as StringFieldConfig}
    />
  ),
  AggregateReferenceConfig: (value, c) => (
    <AggregateReferenceFieldValueView
      value={(value as ReferenceId) || undefined}
      config={c as AggregateReferenceConfig}
    />
  ),
  NodeReferenceConfig: (value, c) => (
    <NodeReferenceFieldValueView
      value={(value as ReferenceId) || undefined}
      config={c as NodeReferenceConfig}
    />
  ),
};
