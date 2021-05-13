import { createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";

export const theme = createMuiTheme({
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
