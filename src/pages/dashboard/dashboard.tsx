import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import { Autocomplete, Grid, styled, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { compact } from "lodash";
import { Link as RouterLink, Route } from "react-router-dom";
import { useObservable } from "react-use";
import { ActionToolbar } from "../../components/custom-styles";
import { useLocaleSelector } from "../../components/translation/use-translation-scope";
import { useServices } from "../../services-def";
import { MatchingRoutes, useComponentMatcher } from "../../shared/named-routes";
import { theme } from "../../theme";
import { DATASHEET_INDEX } from "../datasheet-editor/routes";
import { PROJECT_DEFINITION_INDEX } from "../definition-editor/routes";
import { PROJECT_INDEX } from "../project-editor/routes";

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
  const { routes, auth0 } = useServices();
  const [locale, setLocale] = useLocaleSelector();
  const currentUser = useObservable(
    auth0.observeCurrentUser(),
    auth0.currentUser
  );

  const drawerListItems = compact([
    routes.isAccessible(PROJECT_DEFINITION_INDEX, currentUser.permissions) && (
      <ListItem
        button
        component={RouterLink}
        to={routes.render(PROJECT_DEFINITION_INDEX)}
        key={PROJECT_DEFINITION_INDEX}
      >
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary={"Project Templates"} />
      </ListItem>
    ),

    routes.isAccessible(PROJECT_INDEX, currentUser.permissions) && (
      <ListItem
        button
        component={RouterLink}
        to={routes.render(PROJECT_INDEX)}
        key={PROJECT_INDEX}
      >
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary={"Projects"} />
      </ListItem>
    ),

    routes.isAccessible(DATASHEET_INDEX, currentUser.permissions) && (
      <ListItem
        button
        component={RouterLink}
        to={routes.render(DATASHEET_INDEX)}
        key={DATASHEET_INDEX}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary={"Datasheet"} />
      </ListItem>
    ),
  ]);

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

      {drawerListItems.length > 0 && (
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
          <List>{drawerListItems}</List>
        </Drawer>
      )}

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
            <RouterToolbar />
          </Grid>
          <Grid item xl={12}>
            <MatchingRoutes tag="main-content" firstMatch={true} />
          </Grid>
          <Grid item>
            <Copyright />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function RouterToolbar() {
  const { auth0, loader } = useServices();
  const user = useObservable(auth0.observeCurrentUser(), auth0.currentUser);
  const { hasMatch, matchingComponents } = useComponentMatcher(
    "main-toolbar",
    user.permissions
  );

  if (!hasMatch) {
    return null;
  }

  return (
    <ActionToolbar container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
      {matchingComponents.map((m) => {
        const Component = m.component;
        return (
          <Grid item key={m.name}>
            <Route path={m.path}>
              <Component />
            </Route>
          </Grid>
        );
      })}
    </ActionToolbar>
  );
}
