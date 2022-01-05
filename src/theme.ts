import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material";
import orange from "@mui/material/colors/orange";
import green from "@mui/material/colors/green";

export const theme: Theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 36,
      maxHeight: 50,
    },
  },
  palette: {
    primary: {
      main: green[700],
    },
    secondary: {
      main: orange[500],
    },
  },
});
