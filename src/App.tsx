import { ApolloProvider } from "@apollo/client";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/material";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import { GlobalLoading } from "./components/global-loading";
import { LoginRedirect } from "./pages/account";
import { Dashboard } from "./pages/dashboard";
import { services } from "./services";
import { isNonExistentUser } from "./services-def";
import { ServiceContext } from "./shared/service-context";
import { usePromise } from "./shared/use-promise";
import { theme } from "./theme";

const Auth0ProviderWithHistory = ({ children }: { children: any }) => {
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string;
  const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI as string;

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  if (process.env.REACT_APP_AUTH0_DEV_TOKEN) {
    return children;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

function UserRedirection() {
  const {
    data: user,
    error,
    loading,
  } = usePromise(() => services.auth0.loadUser());

  if (loading || error || user === undefined) {
    return <GlobalLoading />;
  }

  if (isNonExistentUser(user)) {
    return <Redirect to="/registration" />;
  }

  return <Redirect to="/app" />;
}

function App() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <ThemeProvider theme={theme}>
        <Router>
          <Auth0ProviderWithHistory>
            <ServiceContext.Provider value={services}>
              <ApolloProvider client={services.apollo}>
                <Switch>
                  <Route path={"/login"}>
                    <LoginRedirect />
                  </Route>
                  <Route path="/" exact={true}>
                    <UserRedirection />
                  </Route>
                  <Route>
                    <Dashboard />
                  </Route>
                </Switch>
              </ApolloProvider>
            </ServiceContext.Provider>
          </Auth0ProviderWithHistory>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
