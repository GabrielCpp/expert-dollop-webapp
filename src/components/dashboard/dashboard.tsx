import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ApartmentIcon from "@material-ui/icons/Apartment";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink, Route, Switch } from "react-router-dom";

import { LoadingFrame } from "../loading-frame";
import { Button, CircularProgress } from "@material-ui/core";
import { useServices } from "../../services-def";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 36,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    ...theme.mixins.toolbar,
    height: "100%",
  },
  drawer: {
    width: 200,
  },
  drawerPaper: {
    width: 200,
  },
  content: {
    margin: theme.spacing(1),
  },
  main: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  actionToolbarBackground: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    height: theme.spacing(6),
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: 0,
  },
  actionToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

export function Dashboard() {
  const { routes } = useServices();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar className={clsx(classes.toolbar)}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Predykt
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
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
          <ListItem button component={RouterLink} to="/datasheet">
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Datasheet"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <Paper elevation={0} className={classes.actionToolbarBackground}>
          <Toolbar className={clsx(classes.actionToolbar)}>
            <Button startIcon={<ApartmentIcon />}>Delete</Button>
          </Toolbar>
        </Paper>
        <div className={classes.content}>
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
            <Box pt={4}>
              <Copyright />
            </Box>
          </LoadingFrame>
        </div>
      </main>
    </div>
  );
}
