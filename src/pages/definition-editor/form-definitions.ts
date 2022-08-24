import { KeyMapping, KeyNamespace } from "../../components/table-fields";

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
    id: "config",
    fieldConfigType: {
      label: "definition_editor.node_form.field_type",
      id: "fieldConfigType",
    },
    config: {
      bool: {
        id: 'isCheckbox',
        label: "definition_editor.node_form.field_is_checkbox",
      }
    },
    triggers: {
      id: "triggers",
    }
  },
};