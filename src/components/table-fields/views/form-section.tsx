import { Grid } from "@mui/material";
import { getJsxElements, MixedChildren } from "../helpers";

export interface FormSectionProps {
  children: MixedChildren;
  spacing?: number;
  padding?: number;
}

export function FormSection({
  children,
  padding,
  spacing = 1,
}: FormSectionProps) {
  return (
    <Grid container direction="column" spacing={spacing}>
      {getJsxElements(children).map((element) => (
        <Grid item key={element.key} padding={padding}>
          {element}
        </Grid>
      ))}
    </Grid>
  );
}
