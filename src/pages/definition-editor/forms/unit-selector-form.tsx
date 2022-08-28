import { useLoaderEffect } from "../../../components/loading-frame";
import {
  Field,
  selectField,
  SelectOption,
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

  const units: SelectOption[] = data.units.map((u) => ({
    label: u.id,
    id: u.id,
  }));

  units.push({
    id: NoUnit,
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
        component={selectField}
        options={units}
      />
    </>
  );
}
