import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Grid,
  styled,
} from "@mui/material";
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
import { useEffect, useState } from "react";
import {
  Link as RouterLink,
  matchPath,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { ActionToolbar } from "../../components/custom-styles";
import { LoadingFrame } from "../../components/loading-frame";
import { useLocaleSelector } from "../../components/translation/use-translation-scope";
import { useServices } from "../../services-def";
import { NamedRoutes } from "../../shared/named-routes";

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

const DashboardRoot = styled("div")(() => ({
  display: "flex",
}));

const AppBarWithDrawer = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
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
}));

const ToolbarSpacer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "100%",
  ...(theme.mixins.toolbar as any),
}));

const MenuButton = styled(IconButton)(() => ({
  marginRight: 36,
}));

const StyledDrawer = styled(Drawer)(() => ({
  width: 200,
}));

const MainContent = styled("main")(() => ({
  flexGrow: 1,
  marginLeft: "30px",
}));

const MainSection = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
}));

interface Locale {
  id: string;
  label: string;
}

const locales: Locale[] = [
  { label: "EN", id: "en_US" },
  { label: "FR", id: "fr_CA" },
];

export function Dashboard() {
  const { routes } = useServices();
  const [locale, setLocale] = useLocaleSelector();

  return (
    <DashboardRoot>
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

      <StyledDrawer variant="permanent">
        <ToolbarSpacer />
        <List>
          <ListItem
            button
            component={RouterLink}
            to="/project_definition_editor"
          >
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary={"Project Templates"} />
          </ListItem>
          <ListItem button component={RouterLink} to="/project">
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Projects"} />
          </ListItem>
          <ListItem button component={RouterLink} to="/datasheet_template">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Datasheet Template"} />
          </ListItem>
          <ListItem button component={RouterLink} to="/datasheets">
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Datasheet"} />
          </ListItem>
        </List>
      </StyledDrawer>
      <MainContent>
        <ToolbarSpacer />
        <RouterToolbar routes={routes} />
        <MainSection>
          <LoadingFrame loaderComponent={<CircularProgress />}>
            <Switch>
              {routes.allHavingTag("main-content").map((route) => {
                const Component = route.component;

                if (Component === undefined) {
                  return null;
                }

                return (
                  <Route key={route.name} path={route.path} exact={route.exact}>
                    <Component returnUrl={"/"} />
                  </Route>
                );
              })}
            </Switch>
          </LoadingFrame>
        </MainSection>
        <Box pt={4}>
          <Copyright />
        </Box>
      </MainContent>
    </DashboardRoot>
  );
}

function RouterToolbar({ routes }: { routes: NamedRoutes }) {
  const history = useHistory();
  const toolbarWidgets = routes.allHavingTag("main-toolbar");
  const [haveMatchingToolbarwidget, setHaveMatchingWidgets] = useState(false);

  useEffect(() => {
    const toogleToolbarItems = () => {
      setHaveMatchingWidgets(
        toolbarWidgets.some(
          (route) =>
            matchPath(window.location.pathname, {
              path: route.path,
              exact: route.exact,
              strict: true,
            }) !== null
        )
      );
    };

    const unlisten = history.listen(toogleToolbarItems);
    toogleToolbarItems();

    return unlisten;
  });

  return (
    <ActionToolbar elevation={0} hidden={!haveMatchingToolbarwidget}>
      <FlexToolbar>
        <Switch>
          {toolbarWidgets.map((route) => {
            const Component = route.component;

            if (Component === undefined) {
              return null;
            }

            return (
              <Route key={route.name} path={route.path} exact={route.exact}>
                <Component returnUrl={"/"} />
              </Route>
            );
          })}
        </Switch>
      </FlexToolbar>
    </ActionToolbar>
  );
}
