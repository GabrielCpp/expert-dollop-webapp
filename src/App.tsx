import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalLoading } from "./components/global-loading";
import { LoadingFrame } from "./components/loading-frame";
import { CurrentUserDocument } from "./generated";
import {
  AuthentificationCheck,
  AuthTokenView,
  LoginRedirect,
  LogoutRedirect,
  RouteGuard,
} from "./pages/account";
import { Dashboard } from "./pages/dashboard";
import { Services } from "./services-def";
import { ServiceContext } from "./shared/service-context";
import { theme } from "./theme";

const checkAuthenticated: AuthentificationCheck = (s) =>
  s.auth0
    .getToken()
    .then((token) => token === undefined || token === null || token === "");

const checkRegistered: AuthentificationCheck = (s) =>
  s.apollo.query({ query: CurrentUserDocument }).then((result) => {
    const user = result.data?.currentUser;
    return user === null || user === undefined;
  });

const ensures: [string, AuthentificationCheck][] = [
  ["/login", checkAuthenticated],
  ["/registration", checkRegistered],
];

interface AppProps {
  services: Services;
}

function App({ services }: AppProps) {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <ThemeProvider theme={theme}>
        <Router>
          <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
            redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URI as string}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE as string}
          >
            <ServiceContext.Provider value={services}>
              <ApolloProvider client={services.apollo}>
                <LoadingFrame
                  loaderComponent={<CircularProgress color="inherit" />}
                  loader={services.loader}
                >
                  <Switch>
                    <Route path={"/login"}>
                      <LoginRedirect />
                    </Route>
                    <Route path={"/logout"}>
                      <LogoutRedirect />
                    </Route>
                    <Route path={"/token"}>
                      <AuthTokenView />
                    </Route>
                    <Route>
                      <RouteGuard checks={ensures} loader={<GlobalLoading />}>
                        <Dashboard />
                      </RouteGuard>
                    </Route>
                  </Switch>
                </LoadingFrame>
              </ApolloProvider>
            </ServiceContext.Provider>
          </Auth0Provider>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
