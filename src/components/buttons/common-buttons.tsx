import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ExtendButtonBase, IconButton, IconButtonTypeMap } from "@mui/material";

export function AddIconButton(
  props: ExtendButtonBase<IconButtonTypeMap<{}, "button">>
) {
  return (
    <IconButton {...props}>
      <AddIcon />
    </IconButton>
  );
}

export function DeleteIconButton(
  props: ExtendButtonBase<IconButtonTypeMap<{}, "button">>
) {
  return (
    <IconButton {...props}>
      <DeleteIcon />
    </IconButton>
  );
}

export function EditIconButton(
  props: ExtendButtonBase<IconButtonTypeMap<{}, "button">>
) {
  return (
    <IconButton {...props}>
      <EditIcon />
    </IconButton>
  );
}
