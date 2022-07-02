import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Autocomplete,
  CircularProgress,
  Grid,
  styled,
  TextField,
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
import { compact } from "lodash";
import { useEffect, useState } from "react";
import {
  Link as RouterLink,
  matchPath,
  Switch,
  useHistory,
} from "react-router-dom";

import { ActionToolbar } from "../../components/custom-styles";
import { GlobalLoading } from "../../components/global-loading";
import { LoadingFrame } from "../../components/loading-frame";
import { useLocaleSelector } from "../../components/translation/use-translation-scope";
import { User } from "../../generated";
import { useServices } from "../../services-def";
import {
  MatchingRoutes,
  NamedRoutes,
  renderNamedRoute,
} from "../../shared/named-routes";
import { usePromise } from "../../shared/use-promise";
import { DATASHEET_INDEX } from "../datasheet-editor/routes";
import { PROJECT_DEFINITION_INDEX } from "../project-definition-editor/routes";
import { PROJECT_INDEX } from "../project-editor/routes";

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

const MainContent = styled("main", {
  shouldForwardProp: (prop) => prop !== "hasDrawer",
})(({ hasDrawer }: { hasDrawer: boolean }) => ({
  flexGrow: 1,
  ...(hasDrawer ? { marginLeft: "30px" } : {}),
}));

const MainSection = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
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
  const { routes, loader, auth0 } = useServices();
  const [locale, setLocale] = useLocaleSelector();
  const { data: user, error, loading } = usePromise(() => auth0.loadUser());

  if (loading || error || user === undefined) {
    return <GlobalLoading />;
  }

  const drawerListItems = compact([
    routes.isAccessible(PROJECT_DEFINITION_INDEX, user.permissions) && (
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

    routes.isAccessible(PROJECT_INDEX, user.permissions) && (
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

    routes.isAccessible(DATASHEET_INDEX, user.permissions) && (
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

      {drawerListItems.length > 0 && (
        <StyledDrawer variant="permanent">
          <ToolbarSpacer />
          <List>{drawerListItems}</List>
        </StyledDrawer>
      )}

      <MainContent hasDrawer={drawerListItems.length > 0}>
        <ToolbarSpacer />

        <RouterToolbar routes={routes} user={user} />
        <MainSection>
          <LoadingFrame
            loaderComponent={<CircularProgress color="inherit" />}
            loader={loader}
          >
            <MatchingRoutes tag="main-content" firstMatch={true} />
          </LoadingFrame>
        </MainSection>
        <Box pt={4}>
          <Copyright />
        </Box>
      </MainContent>
    </DashboardRoot>
  );
}

function RouterToolbar({ routes, user }: { routes: NamedRoutes; user: User }) {
  const history = useHistory();
  const toolbarWidgets = routes.allHavingTag("main-toolbar", user.permissions);
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
          {toolbarWidgets.map((matchingComponent) =>
            renderNamedRoute(routes, matchingComponent)
          )}
        </Switch>
      </FlexToolbar>
    </ActionToolbar>
  );
}
