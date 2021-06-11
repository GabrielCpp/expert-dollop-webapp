import { ApolloProvider } from "@apollo/client";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { theme } from "./theme";
import { Dashboard } from "./components/dashboard";
import { services } from "./services";
import { ServiceContext } from "./shared/service-context";
import { ThemeProvider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { Login } from "./components/login";
import { GlobalLoading } from "./components/global-loading";

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
                    <Login />
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
