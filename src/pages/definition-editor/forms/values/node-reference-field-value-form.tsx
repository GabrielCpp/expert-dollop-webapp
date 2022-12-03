import { useTranslation } from "react-i18next";
import { useForm } from "../../../../components/table-fields";
import {
  NodeReferenceConfig,
  ReferenceFieldValueInput,
} from "../../../../generated";

interface NodeReferenceFieldValueFormProps {
  name: string;
  parentPath: string[];
  config: NodeReferenceConfig;
  value: ReferenceFieldValueInput;
  label?: string;
}

export function NodeReferenceFieldValueForm({
  name,
  parentPath,
  value,
  label,
  config,
}: NodeReferenceFieldValueFormProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return null;
}
