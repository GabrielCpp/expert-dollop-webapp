import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { Dashboard } from './components/dashboard';
import { EditorLayout } from './components/predykt-project-definition-editor';
import { services } from './services';
import { ServiceContext } from './shared/service-context';


function App() {
  return (
    <ServiceContext.Provider value={services}>
        <ApolloProvider client={services.client}>  
            <Router>
                <Dashboard>
                    <Switch>
                        <Route exact path="/">
                            <Link to="/project_definition_editor/16c3dc29-d136-470e-b48b-96eab0e3eadc/~">{'Go to editor'}</Link>
                        </Route>
                        <Route path="/project_definition_editor/:projectDefinitionId/:selectedPath">
                            <EditorLayout />
                        </Route>
                    </Switch>
                </Dashboard>
            </Router>
        </ApolloProvider>
    </ServiceContext.Provider>
  );
}

export default App;
