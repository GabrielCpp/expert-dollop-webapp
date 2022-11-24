import { useHistory } from "react-router-dom";
import { useServices } from "../../services-def";
import { useNotification } from "./snackbar-hooks";


export function scrollTop() {
  window.scrollTo(0, 0);
}

interface UseNavigateBackParams {
  feed: string;
  completeAction?: () => Promise<void>
}

interface UseNavigateBackResult {
  navigateBack: () => void
  navigateTo: (params: { message: string, to?: string }) => Promise<void>
  catchError: (error?: Error | undefined) => void
  pushFailure: (message: string) => void
}


export function useNavigateTransition({ feed, completeAction }: UseNavigateBackParams): UseNavigateBackResult {
  const { loader } = useServices();
  const { success, failure, catchError } = useNotification(feed);
  const history = useHistory()

  async function navigateTo({ message, to }: { message: string, to?: string }): Promise<void> {
    if (completeAction) {
      await loader.waitFor(completeAction);
    }
    
    success(message);

    if(to) {
      history.push(to)
    }

    scrollTop();
  }

  function pushFailure(message: string) {
    failure(message)
    scrollTop();
  }

  function navigateBack() {
    history.goBack()
  }

  return { navigateBack, navigateTo, pushFailure, catchError }
}