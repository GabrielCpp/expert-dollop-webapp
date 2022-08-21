import { Tooltip } from "@mui/material";
import {
  Field,
  radioField,
  textField,
  checkboxField,
} from "../../../components/table-fields";
import { useDbTranslation } from "../../../components/translation";
import {
  DecimalFieldConfig,
  FindProjectFormContentQuery,
  IntFieldConfig,
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

function integerFormatter(x: string) {
  return x.replace(/[^0-9]/g, "");
}

function decimalFormatter(x: string) {
  return x.replace(/[^0-9.,+-]/g, "").replace(/,/g, ".");
}

export function FieldWrapper({
  definition,
  node,
}: {
  definition: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["definition"];
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["nodes"][number]["node"];
}): JSX.Element {
  const { dbTrans, t } = useDbTranslation(definition.projectDefinitionId);
  const { __typename: fieldType } = definition.config.fieldDetails || {};
  const value = getFieldValue(node.value);
  const validator = JSON.parse(definition.config.valueValidator);
  const commonProps = {
    t: dbTrans,
    unmount: false,
    metadata: node.value?.__typename,
  };

  if (
    fieldType === "StringFieldConfig" ||
    fieldType === "IntFieldConfig" ||
    fieldType === "DecimalFieldConfig"
  ) {
    let unit: string | undefined;
    let formatter = undefined;
    if (fieldType === "IntFieldConfig") {
      const config = definition.config.fieldDetails as IntFieldConfig;
      unit = config.unit;
      formatter = integerFormatter;
    } else if (fieldType === "DecimalFieldConfig") {
      const config = definition.config.fieldDetails as DecimalFieldConfig;
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
        label={definition.config.translations.label}
        title={definition.config.translations.helpTextName}
        component={textField}
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
        label={definition.config.translations.label}
        title={definition.config.translations.helpTextName}
        component={checkboxField}
        {...commonProps}
      />
    );
  }

  if (fieldType === "StaticChoiceFieldConfig") {
    const choices = definition.config.fieldDetails as StaticChoiceFieldConfig;
    return (
      <Field
        options={choices.options}
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={value}
        id={node.id}
        label={definition.config.translations.label}
        title={definition.config.translations.helpTextName}
        component={radioField}
        {...commonProps}
      />
    );
  }

  const staticNumberConfig = definition.config
    .fieldDetails as StaticNumberFieldConfig;

  return (
    <Tooltip title={dbTrans(definition.config.translations.helpTextName)}>
      <div key={definition.name}>
        {dbTrans(definition.config.translations.label)}
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
