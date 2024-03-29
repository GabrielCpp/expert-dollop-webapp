import MenuIcon from "@mui/icons-material/Menu";
import { Autocomplete, Grid, styled, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ActionToolbar } from "../../components/custom-styles";
import { useLocaleSelector } from "../../components/translation/use-translation-scope";
import { RouteBinding } from "../../shared/named-routes";
import { theme } from "../../theme";

const drawerWidth = 220;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AppBarWithDrawer = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(theme.mixins.toolbar as any),
}));

const TextFieldOverToolbar = styled(TextField)`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 4em;
  color: inherit;

  & label.Mui-focused {
    color: white;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;

const FlexToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "100%",
  ...(theme.mixins.toolbar as any),
}));

const ToolbarSpacer = styled("div")(({ theme }) => ({
  ...(theme.mixins.toolbar as any),
  display: "flex",
  height: "100%",
}));

const MenuButton = styled(IconButton)(() => ({
  marginRight: 36,
}));

interface Locale {
  id: string;
  label: string;
}

const locales: Locale[] = [
  { label: "EN", id: "en" },
  { label: "FR", id: "fr" },
];

export function Dashboard() {
  const [locale, setLocale] = useLocaleSelector();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBarWithDrawer position="fixed">
        <FlexToolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <MenuButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                  >
                    <MenuIcon />
                  </MenuButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6" noWrap>
                    Predykt
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Autocomplete<Locale>
                disablePortal
                disableClearable={true as any}
                value={locales.find((l) => l.id === locale)}
                onChange={(event: any, newValue: Locale | null) => {
                  if (newValue) {
                    setLocale(newValue.id);
                  }
                }}
                getOptionLabel={(option) => option.label}
                options={locales}
                renderInput={(params) => (
                  <TextFieldOverToolbar
                    {...params}
                    InputLabelProps={{
                      sx: {
                        color: "rgb(255,255,255)",
                      },
                      ...params.InputLabelProps,
                    }}
                    InputProps={{
                      sx: {
                        color: "rgb(255,255,255)",
                      },
                      ...params.InputProps,
                    }}
                    size="small"
                    label="Locale"
                  />
                )}
              />
            </Grid>
          </Grid>
        </FlexToolbar>
      </AppBarWithDrawer>

      <RouteBinding
        tag="main-drawer"
        displayWhenNoMatch={false}
        overlay={({ children }) => (
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <ToolbarSpacer />
            <List>{children}</List>
          </Drawer>
        )}
        wrapComponent={(c, n) => (
          <Grid item key={c.name}>
            {n}
          </Grid>
        )}
      />

      <Box
        sx={{
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
          flexGrow: 1,
          overflowWrap: "anywhere",
        }}
      >
        <DrawerHeader />
        <ToolbarSpacer />

        <Grid container direction="column" spacing={1}>
          <Grid item xl={12}>
            <RouteBinding
              tag="main-toolbar"
              displayWhenNoMatch={false}
              overlay={({ children }) => (
                <ActionToolbar
                  container
                  columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                >
                  {children}
                </ActionToolbar>
              )}
              wrapComponent={(c, n) => (
                <Grid item key={c.name}>
                  {n}
                </Grid>
              )}
            />
          </Grid>
          <Grid item xl={12}>
            <RouteBinding tag="main-content" firstMatch={true} />
          </Grid>
          <Grid item>
            <Copyright />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
