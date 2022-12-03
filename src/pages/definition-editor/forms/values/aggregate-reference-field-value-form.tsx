import { useTranslation } from "react-i18next";
import { useForm } from "../../../../components/table-fields";
import {
  AggregateReferenceConfig,
  ReferenceFieldValueInput,
} from "../../../../generated";

interface AggregateReferenceFieldValueFormProps {
  name: string;
  parentPath: string[];
  config: AggregateReferenceConfig;
  value: ReferenceFieldValueInput;
  label?: string;
}

export function AggregateReferenceFieldValueForm({
  name,
  parentPath,
  value,
  label,
  config,
}: AggregateReferenceFieldValueFormProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return null;
}
