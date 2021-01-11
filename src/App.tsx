import React from 'react';
import { ContainerContext, container, useInject } from './common/container-context'
import { ProjectDefinitionEditor } from './components'

/*
const formDesign: FormFieldProps = {
    name: 'dkpms',
    fieldTableName: 'form-field',
    label: "Length of the Triangle",
    popover: {
        text: "An very very very very very long \nhelpful text",
    },
    defaultValue: '0',   
    cast: Number, 
    jsonSchemaValidator: {
        "type": "string",
        "pattern": "^[0-9]+$",
        "errorMessage": {
            "pattern": "Must only contains numeric value"
        }
    }
}

const checkboxProps: FormFieldCheckboxProps = {
    name: 'dkpma',
    fieldTableName: 'form-field',
    label: "Length of the Triangle",
    popover: {
        text: "An very very very very very long \nhelpful text",
    },
}

const formGroups: FieldGroupFormProps = {
    groups: [
        {
            fields: [],
            i18DisplayName: 'test',
            i18nTooltip: 'test2',
            isAccordion: true,
            name: "kliker123"
        }
    ]
}

*/
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Dashboard } from './components/dashboard';
import { EditorLayout, AddContainerView, addContainerDefinitionProvider } from './components/predykt-project-definition-editor';
import { CONTAINER_VIEW_ROUTE_NAME } from './components/predykt-project-definition-editor/routes';


function App() {
  const addContainerDefinition = container.get<(formId: string) => void>(addContainerDefinitionProvider)

  return (
    <ContainerContext.Provider value={container}>   
        <Router>
            <Dashboard>
                <Switch>
                    <Route exact path="/">
                        <Link to="/project_definition_editor/f97cfe6e-b97d-4b98-80c6-a214851f285c/~">{'Go to editor'}</Link>
                    </Route>
                    <Route path="/project_definition_editor/:projectDefinitionId">
                        <ProjectDefinitionEditor>
                            <Switch>
                                <Route path="/project_definition_editor/:projectDefinitionId/:selectedPath/add_section">   
                                    <AddContainerView returnRouteName={CONTAINER_VIEW_ROUTE_NAME} onSubmit={addContainerDefinition}/>
                                </Route>
                                <Route path="/project_definition_editor/:projectDefinitionId/:selectedPath">   
                                    <EditorLayout></EditorLayout>
                                </Route>
                            </Switch>
                        </ProjectDefinitionEditor>
                    </Route>
                </Switch>
            </Dashboard>
        </Router>
    </ContainerContext.Provider>
  );
}

export default App;
