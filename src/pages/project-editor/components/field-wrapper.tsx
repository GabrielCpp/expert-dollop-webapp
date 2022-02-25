import { Field, radioField, textField } from "../../../components/table-fields";
import { checkboxField } from "../../../components/table-fields/table-checkbox-field";
import { useDbTranslation } from "../../../components/translation";
import {
  DecimalFieldConfig,
  FindProjectFormContentQuery,
  IntFieldConfig,
  StaticChoiceFieldConfig,
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

export function FieldWrapper({
  definition,
  node,
}: {
  definition: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["definition"];
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["nodes"][number]["node"];
}): JSX.Element {
  const { dbTrans } = useDbTranslation(definition.projectDefId);
  const { __typename: fieldType } = definition.config.fieldDetails || {};
  const value = getFieldValue(node.value);
  const validator = JSON.parse(definition.config.valueValidator);

  if (
    fieldType === "StringFieldConfig" ||
    fieldType === "IntFieldConfig" ||
    fieldType === "DecimalFieldConfig"
  ) {
    let unit: string | undefined;
    if (fieldType === "IntFieldConfig") {
      const config = definition.config.fieldDetails as IntFieldConfig;
      unit = config.unit;
    } else if (fieldType === "DecimalFieldConfig") {
      const config = definition.config.fieldDetails as DecimalFieldConfig;
      unit = config.unit;
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
        t={dbTrans}
        component={textField}
        unit={unit}
      />
    );
  }

  if (fieldType === "BoolFieldConfig") {
    return (
      <Field
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={value}
        id={node.id}
        label={definition.config.translations.label}
        title={definition.config.translations.helpTextName}
        t={dbTrans}
        component={checkboxField}
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
        t={dbTrans}
        component={radioField}
      />
    );
  }

  return <div key={definition.name}>{definition.name}</div>;
}
