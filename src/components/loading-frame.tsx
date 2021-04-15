import { useRef, useState } from "react";

export type OnLoading = (isLoading: boolean, error?: Error) => void;

interface LoadingSpinnerProps {
  children: (getLoader: (name: string) => OnLoading) => JSX.Element;
  loaderComponent: JSX.Element;
}

interface ComponentLoadingState {
  setLoadingState: (isLoading: boolean) => void;
  isLoading: boolean;
}

export function LoadingFrame({
  children,
  loaderComponent,
}: LoadingSpinnerProps) {
  const loaders = useRef<Record<string, ComponentLoadingState>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const buildSetLoading = (name: string) => (
    isLoading: boolean,
    error?: Error
  ) => {
    loaders.current[name].isLoading = isLoading;

    let newLoadingState = true;

    for (const state of Object.values(loaders.current)) {
      newLoadingState = newLoadingState && state.isLoading;
    }

    setIsLoading(newLoadingState);

    if (error) {
      console.error(error);
    }
  };

  function getLoader(name: string): (isLoading: boolean) => void {
    let componentLoadingState = loaders.current[name];

    if (componentLoadingState === undefined) {
      componentLoadingState = {
        setLoadingState: buildSetLoading(name),
        isLoading: true,
      };

      loaders.current[name] = componentLoadingState;
    }

    return componentLoadingState.setLoadingState;
  }

  return (
    <>
      <span style={{ display: isLoading ? "inline" : "none" }}>
        {loaderComponent}
      </span>
      <div style={{ display: isLoading ? "none" : "block" }}>
        {children(getLoader)}
      </div>
    </>
  );
}
