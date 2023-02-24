import { SelectOption } from "@mui/base";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  Field,
  SelectField,
  makeEnumValidator,
  Translator,
} from "../../../components/table-fields";
import { useUnitsQuery } from "../../../generated";

const NoUnit = "none";

interface UnitSelectorProps {
  formPath: string[];
  unit?: string | null;
  name: string;
  label: string;
  t: Translator;
}

export function UnitSelector({
  formPath,
  unit,
  name,
  label,
  t,
}: UnitSelectorProps) {
  const { data, loading, error } = useUnitsQuery();
  useLoaderEffect(error, loading);

  if (data === undefined) {
    return null;
  }

  const units: SelectOption<string>[] = data.units.map((u) => ({
    label: u.id,
    value: u.id,
  }));

  units.push({
    value: NoUnit,
    label: "definition_editor.unit_selection_form.option_no_unit_selected",
  });

  return (
    <>
      <Field
        validator={makeEnumValidator(units)}
        defaultValue={unit || NoUnit}
        path={formPath}
        name={name}
        key={name}
        label={label}
        t={t}
        component={SelectField}
        options={units}
      />
    </>
  );
}
