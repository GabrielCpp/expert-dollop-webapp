
import {
  useEffect, useRef,
  useState
} from "react";
import { useServices } from "../../../services-def";
import {
  FormFieldError,
  FormFieldRecord, queryChildrenOfWithErrors
} from "../form-field-record";

export function useFormErrors(...rootPath: string[]): FormFieldError[][] {
  const { reduxDb } = useServices();
  const [errors, setErrors] = useState<FormFieldError[][]>([]);
  const rootPathMemoised = useRef(rootPath);

  useEffect(() => {
    function onChange(records: FormFieldRecord[]) {
      setErrors(records.map((x) => x.errors));
    }

    const [, unsubcribe] = reduxDb.watchQuery(
      queryChildrenOfWithErrors(rootPathMemoised.current),
      onChange
    );

    return unsubcribe;
  }, [reduxDb, rootPathMemoised]);

  return errors;
}
