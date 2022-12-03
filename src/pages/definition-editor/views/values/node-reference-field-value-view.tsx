import { useTranslation } from "react-i18next";
import { useForm } from "../../../../components/table-fields";
import {
  NodeReferenceConfig,
  ReferenceFieldValueInput,
} from "../../../../generated";

interface NodeReferenceFieldValueViewProps {
  config: NodeReferenceConfig;
  value?: ReferenceFieldValueInput;
}

export function NodeReferenceFieldValueView({
  value,
  config,
}: NodeReferenceFieldValueViewProps) {
  return null;
}
