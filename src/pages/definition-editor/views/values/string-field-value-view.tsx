import { StringFieldConfig, StringFieldValue } from "../../../../generated";

interface StringFieldValueViewProps {
  config: StringFieldConfig;
  value?: StringFieldValue;
}

export function StringFieldValueView({
  config,
  value,
}: StringFieldValueViewProps) {
  if (value === undefined) {
    return null;
  }

  return <span>{value.text}</span>;
}
