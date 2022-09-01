import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  Translator,
  useForm,
} from "../../../components/table-fields";
import { NodeMetaConfigInput } from "../../../generated";

interface MetaConfigFormProps {
  t: Translator;
  parentPath: string[];
  name: string;
  meta: NodeMetaConfigInput;
  labels: {
    isVisible: {
      name: string;
      label: string;
    };
  };
}

export function MetaConfigForm({
  parentPath,
  name,
  t,
  labels,
  meta,
}: MetaConfigFormProps) {
  const { formPath } = useForm({ parentPath, name });

  return (
    <Field
      validator={BOOLEAN_VALIDATOR}
      path={formPath}
      defaultValue={meta.isVisible}
      key={labels.isVisible.name}
      name={labels.isVisible.name}
      label={labels.isVisible.label}
      t={t}
      component={checkboxField}
    />
  );
}
