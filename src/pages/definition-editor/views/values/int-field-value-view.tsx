import { IntFieldConfig, IntFieldValue } from "../../../../generated";

interface IntFieldValueViewProps {
  config: IntFieldConfig;
  value?: IntFieldValue;
}

export function IntFieldValueView({ config, value }: IntFieldValueViewProps) {
  if (value === undefined) {
    return null;
  }

  return <span>{value.integer}</span>;
}
