import { useEffect, useState } from "react";
import { useServices } from "../services-def";
import { useId } from "../shared/redux-db";

interface LoadingSpinnerProps {
  children: JSX.Element | JSX.Element[];
  loaderComponent: JSX.Element;
}

export function LoadingFrame({
  children,
  loaderComponent,
}: LoadingSpinnerProps) {
  const { loader } = useServices();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loader.setEffect(onLoading);
  });

  function onLoading(newIsLoading: boolean, error?: Error): void {
    setIsLoading(newIsLoading);
  }

  return (
    <>
      <span style={{ display: isLoading ? "inline" : "none" }}>
        {loaderComponent}
      </span>
      <div style={{ display: isLoading ? "none" : "block" }}>{children}</div>
    </>
  );
}

export function useLoader() {
  const { loader } = useServices();
  const componentId = useId();

  useEffect(() => {
    return () => loader.deleteEmitter(componentId);
  }, [componentId, loader]);

  return {
    onLoading: loader.getEmitter(componentId),
  };
}

export function useLoaderEffect(
  error: Error | undefined,
  ...loading: boolean[]
) {
  const { onLoading } = useLoader();

  useEffect(() => {
    onLoading(
      loading.some((x) => x === true),
      error
    );
  }, [error, ...loading, onLoading]);
}
