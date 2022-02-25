import { useCallback } from "react";
import { useServices } from "../../services-def";
import { useId } from "../../shared/redux-db";

export const SUCESS_FEED = "SUCESS";
export const FAILURE_FEED = "FAILURE";
export const CLEAR_ALERTS = "CLEAR_ALERTS";

export function useNotification(feedName: string) {
  const id = useId();
  const { feeds, loader } = useServices();
  const success = useCallback(
    (message?: string) => {
      feeds.fire(feedName, {
        type: SUCESS_FEED,
        payload: {
          message,
        },
      });
    },
    [feedName, feeds]
  );

  const failure = useCallback(
    (message?: string) => {
      feeds.fire(feedName, {
        type: FAILURE_FEED,
        payload: {
          message,
        },
      });
    },
    [feedName, feeds]
  );

  const clear = useCallback(() => {
    feeds.fire(feedName, {
      type: CLEAR_ALERTS,
      payload: {},
    });
  }, [feedName, feeds]);

  const catchError = useCallback(
    (error?: Error) => {
      if (error) {
        failure(error.name);
        loader.onLoading(id, false, error);
      }
    },
    [failure, loader, id]
  );

  return { success, failure, clear, catchError };
}
