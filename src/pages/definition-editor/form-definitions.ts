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
    name: "name",
  },
  isCollection: {
    label: "definition_editor.node_form.field_is_collection",
    name: "isCollection",
  },
  instanciateByDefault: {
    label: "definition_editor.node_form.field_instanciate_by_default",
    name: "instanciateByDefault",
  },
  orderIndex: {
    label: "definition_editor.node_form.field_order",
    name: "orderIndex",
  },
  meta: {
    name: 'meta',
    isVisible: {
      name: 'isVisible',
      label: 'definition_editor.node_form.meta_is_visible'
    }
  },
  tabs: {
    name: "translated",
    defaultOne: "fr",
    body: {
      label: {
        name: "value",
        label: "definition_editor.node_form.field_label"
      },
      helpText: {
        name: "value",
        label: "definition_editor.node_form.field_help_text"
      }
    },
    fr: {
      label: "definition_editor.node_form.tab_french",
      name: "fr",
      locale: 'fr-CA'
    },
    en: {
      label: "definition_editor.node_form.tab_english",
      name: "en",
      locale: 'en-US'
    },
  },
  sectionConfig: {
    name: "fieldDetails",
    sectionConfigTypes: {
      name: "kind",
      label: "definition_editor.node_form.section_config_label",
      options: [
        {
          id: FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG,
          label: "definition_editor.node_form.section_config_types_collapsible_container_field_config",
        },
      ],
      defaultOption: FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG,
    },
    collapsibleContainer: {
      name: "collapsibleContainer",
      isCollapsible: {
        name: 'isCollapsible',
        label: 'definition_editor.node_form.section_config_field_collapsible_container',
        defaultValue: false,
      }
    }
  },
  fieldConfig: {
    name: "fieldDetails",
    fieldConfigType: {
      label: "definition_editor.node_form.field_type",
      name: "kind",
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
      name: 'enabled',
      label: "definition_editor.node_form.field_bool_default_value",
    },
    int: {
      name: 'integer',
      label: "definition_editor.node_form.field_int_default_value",
    },
    decimal: {
      name: 'numeric',
      label: "definition_editor.node_form.field_numeric_default_value",
    },
    string: {
      name: 'string',
      label: "definition_editor.node_form.field_string_default_value",
    },
    staticChoice: {
      name: 'staticChoice',
      label: "definition_editor.node_form.field_static_choice",
      selected: {
        name: "selected",
        label: "definition_editor.node_form.static_choice_default_selection",
        fallbackLabel: "definition_editor.node_form.static_choice_no_choice_available"
      },
      optionCardHeader: {
        label: "definition_editor.node_form.static_choice_option_card_header_title"
      },
      options: {
        formElement: {
          name: "options"
        },
        id: {
          name: "id",
          label: "definition_editor.node_form.static_choice_option_id"
        },
        label: {
          name: "label",
          label: "definition_editor.node_form.static_choice_option_label"
        },
        helpText: {
          name: "helpText",
          label: "definition_editor.node_form.static_choice_option_help_text"
        },
        tabs: {
          name: "translated",
          defaultOne: "fr",
          body: {
            label: {
              name: "value",
              label: "definition_editor.node_form.field_label"
            },
            helpText: {
              name: "value",
              label: "definition_editor.node_form.field_help_text"
            }
          },
          fr: {
            label: "definition_editor.node_form.tab_french",
            name: "fr",
            locale: 'fr-CA'
          },
          en: {
            label: "definition_editor.node_form.tab_english",
            name: "en",
            locale: 'en-US'
          },
        }
      }
    },
    unit: {
      name: 'unit',
      label: "definition_editor.node_form.field_unit",
    },
    precision: {
      name: 'precision',
      label: "definition_editor.node_form.field_precision",
      defaultPrecision: 3,
      defaultValue: 0
    },
  },
  triggers: {
    name: "triggers",
    formTitle: "definition_editor.node_form.triggers_header_title",
    blankSlates: {
      noTriggerYetLabel: "definition_editor.node_form.triggers_blank_slate_none_created"
    },
    action: {
      name: "action",
      label: "definition_editor.node_form.triggers_action",
      defaultValue:  "SET_VISIBILITY",
      options: [
        {
          id: "CHANGE_NAME",
          label:
            "definition_editor.node_form.triggers_action_option_change_name_option",
        },
        {
          id: "SET_VISIBILITY",
          label:
            "definition_editor.node_form.triggers_action_option_set_visibility_option",
        },
      ]
    },
    targetTypeId: {
      name: "targetTypeId",
      label: ""
    }
  }
};