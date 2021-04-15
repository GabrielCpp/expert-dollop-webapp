import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Dashboard } from "./components/dashboard";
import { services } from "./services";
import { ServiceContext } from "./shared/service-context";

function App() {
  return (
    <ServiceContext.Provider value={services}>
      <ApolloProvider client={services.apollo}>
        <Router>
          <Dashboard />
        </Router>
      </ApolloProvider>
    </ServiceContext.Provider>
  );
}

export default App;
