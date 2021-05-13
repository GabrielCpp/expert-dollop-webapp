import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "./theme";
import { Dashboard } from "./components/dashboard";
import { services } from "./services";
import { ServiceContext } from "./shared/service-context";
import { ThemeProvider } from "@material-ui/core";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ServiceContext.Provider value={services}>
        <ApolloProvider client={services.apollo}>
          <Router>
            <Dashboard />
          </Router>
        </ApolloProvider>
      </ServiceContext.Provider>
    </ThemeProvider>
  );
}

export default App;
