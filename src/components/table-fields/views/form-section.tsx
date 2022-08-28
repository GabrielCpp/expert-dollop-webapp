import { Grid } from "@mui/material";
import { getJsxElements, MixedChildren } from "../helpers";

interface FormSectionProps {
  children: MixedChildren;
  spacing?: number;
}

export function FormSection({
  children,

  spacing = 2,
}: FormSectionProps) {
  return (
    <Grid container direction="column" spacing={spacing}>
      {getJsxElements(children).map((element) => (
        <Grid item key={element.key}>
          {element}
        </Grid>
      ))}
    </Grid>
  );
}
