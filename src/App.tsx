import React from 'react';
import { ContainerContext, container } from './common/container-context'
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
import { Link, Router, RouteComponentProps} from '@reach/router';
import { Dashboard } from './components/dashboard';
const Home = (_: RouteComponentProps) => <Link to="/project_definition_editor/a3b082e5-6253-4c2d-8daf-3eba1fa05416">{'Go to editor'}</Link>

function App() {
  return (
      <ContainerContext.Provider value={container}>
        <div className="App">
        <Dashboard>
            <Router>
                <Home path="/" />
                <ProjectDefinitionEditor path="/project_definition_editor/:projectDefinitionId" />
            </Router>
        </Dashboard>

        </div>
      </ContainerContext.Provider>
  );
}

export default App;
