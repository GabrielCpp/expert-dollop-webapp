import React from 'react';
import { DatabaseContext, createDb } from './redux-db'
import { ContainerContext, container } from './container-context'
import { FormField, FormFieldProps, FieldGroupForm, FieldGroupFormProps, FormFieldCheckbox, FormFieldCheckboxProps } from './components'



const db = createDb({
    'todo': {
        getPkKey: e => e.id,
        views: {},
        defaultData: [
            { id: 'dkpms', description: 'Test'}
        ],
    },
    'form-field': {
        getPkKey: e => e.name,
        views: {},
        defaultData: [
            { name: 'dkpms', description: 'Test'}
        ],
    },
    'form-field-error': {
        getPkKey: e => e.name,
        views: {},
        defaultData: [],
    }
})

const formDesign: FormFieldProps = {
    name: 'dkpms',
    fieldTableName: 'form-field',
    errorTableName: 'form-field-error',
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


function App() {
  return (
      <ContainerContext.Provider value={container}>
        <DatabaseContext.Provider value = {db}>
            <div className="App">
                <FieldGroupForm {...formGroups}></FieldGroupForm>
                <FormField {...formDesign}></FormField>
                <FormFieldCheckbox {...checkboxProps}></FormFieldCheckbox>
            </div>
        </DatabaseContext.Provider>
      </ContainerContext.Provider>
  );
}

export default App;
