import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Field,
  FieldArray,
  selectField,
  STRING_VALIDATOR,
  useFieldArray,
  useForm,
} from "../../../components/table-fields";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface TriggersProps {
  path: string[];
}

export function Triggers({ path }: TriggersProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name: "triggers", parentPath: path });
  const { push, remove, ids } = useFieldArray();

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={push}>
            <AddIcon />
          </IconButton>
        }
        title="Triggers"
      />
      <CardContent>
        <Grid direction="column" container>
          <FieldArray ids={ids}>
            {(id, metadata) => (
              <Grid key={id}>
                <IconButton onClick={() => remove(id)}>
                  <DeleteIcon />
                </IconButton>
                <Field
                  id={id}
                  metadata={metadata}
                  validator={STRING_VALIDATOR}
                  defaultValue={"SET_VISIBILITY"}
                  path={formPath}
                  name="action"
                  t={t}
                  component={selectField}
                  label="definition_editor.node_form.triggers.action"
                  options={[
                    {
                      id: "CHANGE_NAME",
                      label:
                        "definition_editor.node_form.triggers.change_name_option",
                    },
                    {
                      id: "SET_VISIBILITY",
                      label:
                        "definition_editor.node_form.triggers.set_visibility_option",
                    },
                  ]}
                />
              </Grid>
            )}
          </FieldArray>
        </Grid>
      </CardContent>
    </Card>
  );
}
