import { useEffect } from "react";
import { useServices } from "../../../services-def";
import { useMonoCallbackValue } from "../../../shared/redux-db";
import { deleteFormFieldOpionsRecord, OptionRecord, upsertFormFieldOpionsRecord } from "../form-field-record";
import { v4 as uuid4} from 'uuid'
interface UsePublishFieldOptionsParams<Option extends OptionRecord> {
  buildOptions: (g: () => string) => Option[]
}

export function usePublishFieldOptions<Option extends OptionRecord>({ buildOptions }: UsePublishFieldOptionsParams<Option>) {
  const { reduxDb } = useServices()
  const options = useMonoCallbackValue(buildOptions, uuid4)

  useEffect(() => {
    upsertFormFieldOpionsRecord(reduxDb, options)
    return () => deleteFormFieldOpionsRecord(reduxDb, options)
  }, [reduxDb, options])
}


