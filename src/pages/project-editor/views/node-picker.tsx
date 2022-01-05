import { Select, SelectChangeEvent } from "@mui/material";

interface NodePickerProps<T> {
  nodes: T[];
  current: string;
  onChange: (current: string) => void;
}

export function NodePicker<T extends { node: { id: string } }>({
  nodes,
  current,
  onChange,
}: NodePickerProps<T>) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };

  if (nodes.length === 0) {
    return null;
  }

  return (
    <Select native value={current} onChange={handleChange}>
      {nodes.map((node, index) => (
        <option key={node.node.id} value={node.node.id}>
          {index}
        </option>
      ))}
    </Select>
  );
}
