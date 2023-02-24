import { Tooltip } from "@mui/material";
import {
  checkboxField,
  Field,
  FieldLabel,
  RadioField,
  InlineTextField,
} from "../../../components/table-fields";
import { useDbTranslation } from "../../../components/translation";
import {
  FindProjectFormContentQuery,
  StaticChoiceFieldConfig,
  StaticNumberFieldConfig,
} from "../../../generated";

function getFieldValue(
  value: Record<string, string | number | boolean> | undefined | null
): string | number | boolean {
  const { text, numeric, enabled, integer } = {
    text: null,
    numeric: null,
    enabled: null,
    integer: null,
    ...value,
  };

  const realValue = [text, numeric, enabled, integer].find((x) => x != null);

  if (realValue === null || realValue === undefined) {
    throw new Error("Bad value");
  }

  return realValue;
}

function integerFormatter(x: unknown) {
  return String(x).replace(/[^0-9]/g, "");
}

function decimalFormatter(x: unknown) {
  return String(x)
    .replace(/[^0-9.,+-]/g, "")
    .replace(/,/g, ".");
}

export function FieldWrapper({
  definition,
  node,
}: {
  definition: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["definition"];
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["nodes"][number]["node"];
}): JSX.Element {
  const { dbTrans, t } = useDbTranslation(definition.projectDefinitionId);
  const { __typename: fieldType } = definition.fieldDetails || {};
  const value = getFieldValue(node.value);
  const validator =
    definition.validator === undefined
      ? undefined
      : JSON.parse(definition.validator);
  const commonProps = {
    t: dbTrans,
    metadata: {
      typename: node.value?.__typename,
    },
  };

  if (
    fieldType === "StringFieldConfig" ||
    fieldType === "IntFieldConfig" ||
    fieldType === "DecimalFieldConfig"
  ) {
    let unit: string | undefined;
    let formatter = undefined;

    if (fieldType === "IntFieldConfig") {
      const config = definition.fieldDetails as { unit: string };
      unit = config.unit;
      formatter = integerFormatter;
    } else if (fieldType === "DecimalFieldConfig") {
      const config = definition.fieldDetails as { unit: string };
      unit = config.unit;
      formatter = decimalFormatter;
    }

    return (
      <Field
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={value}
        id={node.id}
        label={definition.translations.label}
        title={definition.translations.helpTextName}
        component={InlineTextField}
        unit={unit}
        formatter={formatter}
        {...commonProps}
      />
    );
  }

  if (fieldType === "BoolFieldConfig") {
    return (
      <Field
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={Boolean(value)}
        id={node.id}
        label={definition.translations.label}
        title={definition.translations.helpTextName}
        component={checkboxField}
        {...commonProps}
      />
    );
  }

  if (fieldType === "StaticChoiceFieldConfig") {
    const options = (
      definition.fieldDetails as StaticChoiceFieldConfig
    ).options.map((x) => ({
      value: x.id,
      label: <FieldLabel title={x.helpText} label={x.label} t={dbTrans} />,
    }));

    return (
      <Field
        options={options}
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={value}
        id={node.id}
        label={definition.translations.label}
        title={definition.translations.helpTextName}
        component={RadioField}
        {...commonProps}
      />
    );
  }

  const staticNumberConfig = definition.fieldDetails as StaticNumberFieldConfig;

  return (
    <Tooltip title={dbTrans(definition.translations.helpTextName)}>
      <div key={definition.name}>
        {dbTrans(definition.translations.label)}
        &nbsp;
        <strong>
          {t("intlNumber", { val: value, minimumFractionDigits: 3 })}
        </strong>
        &nbsp;
        {dbTrans(staticNumberConfig.unit)}
      </div>
    </Tooltip>
  );
}
