import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Field,
  FieldArrayElement,
  FormSection,
  IdGenerator,
  selectField,
  SelectOption,
  STRING_VALIDATOR,
  useFieldArray,
  useForm,
} from "../../../components/table-fields";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { TriggerAction, TriggerInput } from "../../../generated";

interface TriggersProps {
  path: string[];
  name: string;
  triggers: TriggerInput[];
  labels: {
    formTitle: string;
    blankSlates: {
      noTriggerYetLabel: string;
    };
    action: {
      name: string;
      label: string;
      defaultValue: string;
      options: SelectOption[];
    };
    targetTypeId: {
      name: string;
      label: string;
    };
  };
}

export function Triggers({ name, path, labels, triggers }: TriggersProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name: name, parentPath: path, value: [] });
  const { push, remove, elements } = useFieldArray(
    makeDefaultTrigger,
    getTriggers(triggers)
  );

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={() => push()}>
            <AddIcon />
          </IconButton>
        }
        title={t(labels.formTitle)}
      />
      <CardContent>
        <FormSection spacing={0}>
          {elements.length === 0 && (
            <span key={labels.blankSlates.noTriggerYetLabel}>
              {t(labels.blankSlates.noTriggerYetLabel)}
            </span>
          )}
          {elements.map((element) => (
            <Grid
              key={element.id}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <IconButton onClick={() => remove(element.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                alignItems="stretch"
                xl={11}
                md={11}
                xs={11}
              >
                <Grid item>
                  <Field
                    id={element.id}
                    metadata={element.metadata}
                    validator={STRING_VALIDATOR}
                    defaultValue={labels.action.defaultValue}
                    path={formPath}
                    name={labels.action.name}
                    label={labels.action.label}
                    options={labels.action.options}
                    t={t}
                    component={selectField}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </FormSection>
      </CardContent>
    </Card>
  );
}

function makeDefaultTrigger() {
  return {
    action: TriggerAction.CHANGE_NAME,
    params: [],
    targetTypeId: "",
  };
}

const getTriggers =
  (triggers: TriggerInput[]) =>
  (makeId: IdGenerator) =>
  (): FieldArrayElement<TriggerInput>[] => {
    return triggers.map((trigger, index) => ({
      id: makeId(),
      metadata: {
        ordinal: index,
      },
      value: {
        action: trigger.action,
        params: trigger.params,
        targetTypeId: trigger.targetTypeId,
      },
    }));
  };
