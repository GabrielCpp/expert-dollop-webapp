import { useTranslation } from "react-i18next";
import {
  useForm,
  Field,
  INT_VALIDATOR,
  InlineTextField,
} from "../../../../components/table-fields";
import { IntFieldConfigInput } from "../../../../generated";
import { UnitSelector } from "../unit-selector-form";

interface IntFieldConfigProps {
  name: string;
  parentPath: string[];
  labels: {
    int: {
      name: string;
      label: string;
    };
    unit: {
      name: string;
      label: string;
    };
  };
  config?: IntFieldConfigInput | null;
}

export function IntFieldConfigForm({
  name,
  parentPath,
  labels,
  config,
}: IntFieldConfigProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <>
      <Field
        validator={INT_VALIDATOR}
        defaultValue={config?.integer || 0}
        path={formPath}
        name={labels.int.name}
        key={labels.int.name}
        label={labels.int.label}
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
      ,
    </>
  );
}
