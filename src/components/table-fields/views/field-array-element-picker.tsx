import { Select, SelectChangeEvent } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { TranslatedString } from "../form-field-record";

interface FieldArrayElementPickePropsr<T> {
  elements: T[];
  current?: string;
  currentLabel: TranslatedString;
  onChange: (current: string) => void;
  getLabel: (node: T) => TranslatedString;
}

export function FieldArrayElementPicker<T extends { id: string }>({
  elements,
  current,
  currentLabel,
  onChange,
  getLabel,
}: FieldArrayElementPickePropsr<T>) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };

  if (elements.length === 0) {
    return null;
  }

  return (
    <Select native value={current} onChange={handleChange}>
      {elements.map((element) => (
        <option key={element.id} value={element.id}>
          {element.id === current ? currentLabel : getLabel(element)}
        </option>
      ))}
    </Select>
  );
}

export function useNodePickerState(id?: string): {
  currentNodeId?: string;
  setCurrentNodeId: (id?: string) => void;
} {
  const [currentNodeId, setCurrentNodeId] = useState(id);

  useLayoutEffect(() => {
    if (id !== undefined) {
      setCurrentNodeId(id);
    }
  }, [id]);

  return { currentNodeId, setCurrentNodeId };
}
