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
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import AssignmentIcon from "@mui/icons-material/Assignment";
import clsx from "clsx";
import {
  Link as RouterLink,
  matchPath,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import { LoadingFrame } from "../../components/loading-frame";
import { alpha, CircularProgress, styled, Theme } from "@mui/material";
import { useServices } from "../../services-def";
import { NamedRoutes } from "../../shared/named-routes";
import { useEffect, useState } from "react";
import { theme } from "../../theme";
import { ActionToolbar } from "../../components/custom-styles";

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
  width: "calc(100vw - 200px)",
}));

const MainSection = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
}));

export function Dashboard() {
  const { routes } = useServices();

  return (
    <DashboardRoot>
      <CssBaseline />
      <AppBarWithDrawer position="fixed">
        <FlexToolbar>
          <MenuButton color="inherit" aria-label="open drawer" edge="start">
            <MenuIcon />
          </MenuButton>
          <Typography variant="h6" noWrap>
            Predykt
          </Typography>
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
