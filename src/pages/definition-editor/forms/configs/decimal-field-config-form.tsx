import { useTranslation } from "react-i18next";
import {
  useForm,
  Field,
  DECIMAL_VALIDATOR,
  InlineTextField,
  INT_VALIDATOR,
} from "../../../../components/table-fields";
import { DecimalFieldConfigInput } from "../../../../generated";
import { UnitSelector } from "../unit-selector-form";

interface DecimalFieldConfigProps {
  name: string;
  parentPath: string[];
  labels: {
    decimal: {
      name: string;
      label: string;
    };
    unit: {
      name: string;
      label: string;
    };
    precision: {
      name: string;
      label: string;
      defaultPrecision: number;
      defaultValue: number;
    };
  };
  config?: DecimalFieldConfigInput | null;
}

export function DecimalFieldConfigForm({
  name,
  parentPath,
  labels,
  config,
}: DecimalFieldConfigProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <>
      <Field
        validator={DECIMAL_VALIDATOR}
        defaultValue={config?.numeric || labels.precision.defaultValue}
        path={formPath}
        name={labels.decimal.name}
        key={labels.decimal.name}
        label={labels.decimal.label}
        t={t}
        component={InlineTextField}
      />
      <Field
        validator={INT_VALIDATOR}
        defaultValue={config?.precision || labels.precision.defaultPrecision}
        path={formPath}
        name={labels.precision.name}
        key={labels.precision.name}
        label={labels.precision.label}
        t={t}
        component={InlineTextField}
      />
      <UnitSelector
        unit={config?.unit}
        formPath={formPath}
        name={labels.unit.name}
        key={labels.unit.name}
        label={labels.unit.label}
        t={t}
      />
    </>
  );
}
