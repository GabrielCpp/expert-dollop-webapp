import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material";
import orange from "@mui/material/colors/orange";
import green from "@mui/material/colors/green";

export const theme: Theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
        },
      },
    },
  },
  mixins: {
    toolbar: {
      maxHeight: "4em",
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
