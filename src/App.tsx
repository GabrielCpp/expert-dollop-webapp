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
function App() {
  return (
      <ContainerContext.Provider value={container}>
        <div className="App">
            <ProjectDefinitionEditor projectDefinitionId="68fa00aa-e552-4e97-9748-686003cf6172"/>
        </div>
      </ContainerContext.Provider>
  );
}

export default App;
