import { Grid } from "@mui/material";
import { getJsxElements, MixedChildren } from "../helpers";

interface FormSectionProps {
  children: MixedChildren;
}

export function FormSection({ children }: FormSectionProps) {
  return (
    <Grid container direction="column" rowSpacing={1}>
      {getJsxElements(children).map((element) => (
        <Grid item key={element.key}>
          {element}
        </Grid>
      ))}
    </Grid>
  );
}
