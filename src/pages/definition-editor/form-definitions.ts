import { KeyMapping, KeyNamespace } from "../../components/table-fields";
import { FieldDetailsType } from "../../generated";

export type NodeLevel = "rootSection" | "subSection" | "form" | "section" | "field";
export type FormRole = "edit" | "add";
export const levelMapping: Record<string, NodeLevel> = {
  0: "rootSection",
  1: "subSection",
  2: "form",
  3: "section",
  4: "field",
};


export const nodeFormLabels = {
  title: new KeyNamespace<FormRole, NodeLevel>({
    edit: new KeyMapping<NodeLevel>({
      rootSection: "definition_editor.node_form.title_root_section_edit",
      subSection: "definition_editor.node_form.title_sub_section_edit",
      form: "definition_editor.node_form.title_form_edit",
      section: "definition_editor.node_form.title_section_edit",
      field: "definition_editor.node_form.title_field_edit",
    }),
    add: new KeyMapping<NodeLevel>({
      rootSection: "definition_editor.node_form.title_root_section_add",
      subSection: "definition_editor.node_form.title_sub_section_add",
      form: "definition_editor.node_form.title_form_add",
      section: "definition_editor.node_form.title_section_add",
      field: "definition_editor.node_form.title_field_add",
    }),
  }),
  name: {
    label: "definition_editor.node_form.field_name",
    id: "name",
  },
  isCollection: {
    label: "definition_editor.node_form.field_is_collection",
    id: "isCollection",
  },
  instanciateByDefault: {
    label: "definition_editor.node_form.field_instanciate_by_default",
    id: "instanciateByDefault",
  },
  orderIndex: {
    label: "definition_editor.node_form.field_order",
    id: "orderIndex",
  },
  tabs: {
    id: "languages",
    defaultOne: "fr",
    body: {
      label: {
        id: "label",
        label: "definition_editor.node_form.field_label"
      },
      helpText: {
        id: "helpText",
        label: "definition_editor.node_form.field_help_text"
      }
    },
    fr: {
      label: "definition_editor.node_form.tab_french",
      id: "fr",
      locale: 'fr-CA'
    },
    en: {
      label: "definition_editor.node_form.tab_english",
      id: "en",
      locale: 'en-US'
    },
  },
  fieldConfig: {
    id: "fieldDetails",
    fieldConfigType: {
      label: "definition_editor.node_form.field_type",
      id: "fieldConfigType",
      options: [
        {
          id: FieldDetailsType.STRING_FIELD_CONFIG,
          label: "definition_editor.node_form.field_type_option_string",
        },
        {
          id: FieldDetailsType.INT_FIELD_CONFIG,
          label: "definition_editor.node_form.field_type_option_integer",
        },
        {
          id: FieldDetailsType.DECIMAL_FIELD_CONFIG,
          label: "definition_editor.node_form.field_type_option_decimal",
        },
        {
          id: FieldDetailsType.BOOL_FIELD_CONFIG,
          label: "definition_editor.node_form.field_type_option_boolean",
        },
        {
          id: FieldDetailsType.STATIC_CHOICE_FIELD_CONFIG,
          label: "definition_editor.node_form.field_type_option_choice",
        },
        {
          id: FieldDetailsType.STATIC_NUMBER_FIELD_CONFIG,
          label: "definition_editor.node_form.field_type_option_computation",
        },
      ]
    },
    bool: {
      id: 'enabled',
      label: "definition_editor.node_form.field_bool_default_value",
    },
    int: {
      id: 'integer',
      label: "definition_editor.node_form.field_int_default_value",
    },
    decimal: {
      id: 'numeric',
      label: "definition_editor.node_form.field_numeric_default_value",
    },
    string: {
      id: 'string',
      label: "definition_editor.node_form.field_string_default_value",
    },
    staticChoice: {
      id: 'staticChoice',
      label: "definition_editor.node_form.field_static_choice",
      selected: {
        id: "selected",
        label: "definition_editor.node_form.static_choice_default_selection",
        fallbackLabel: "definition_editor.node_form.static_choice_no_choice_available"
      },
      optionCardHeader: {
        label: "definition_editor.node_form.static_choice_option_card_header_title"
      },
      options: {
        id: {
          id: "id",
          label: "definition_editor.node_form.static_choice_option_id"
        },
        label: {
          id: "label",
          label: "definition_editor.node_form.static_choice_option_label"
        },
        helpText: {
          id: "help_text",
          label: "definition_editor.node_form.static_choice_option_help_text"
        },
        tabs: {
          id: "languages",
          defaultOne: "fr",
          body: {
            label: {
              id: "label",
              label: "definition_editor.node_form.field_label"
            },
            helpText: {
              id: "helpText",
              label: "definition_editor.node_form.field_help_text"
            }
          },
          fr: {
            label: "definition_editor.node_form.tab_french",
            id: "fr",
            locale: 'fr-CA'
          },
          en: {
            label: "definition_editor.node_form.tab_english",
            id: "en",
            locale: 'en-US'
          },
        }
      }
    },
    unit: {
      id: 'unit',
      label: "definition_editor.node_form.field_unit",
    },
    precision: {
      id: 'precision',
      label: "definition_editor.node_form.field_precision",
      defaultPrecision: 3,
      defaultValue: 0
    },
    
  },
  triggers: {
    id: "triggers",
  }
};