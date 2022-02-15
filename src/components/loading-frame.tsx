import React, { useEffect, useLayoutEffect, useState } from "react";
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

  useLayoutEffect(() => {
    return loader.addHandler(onLoading);
  });

  function onLoading(_: boolean, error?: Error): void {
    if (error) {
      console.error(error);
    }

    setIsLoading(() => loader.lastLoadingState);
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

export function HiddenWhileLoading({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element | null {
  const { loader } = useServices();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    return loader.addHandler(onLoading);
  });

  function onLoading(_: boolean, error?: Error): void {
    if (error) {
      console.error(error);
    }

    setIsLoading(() => loader.lastLoadingState);
  }

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}

export function useLoaderEffect(
  error: Error | undefined,
  ...loading: boolean[]
) {
  const id = useId();
  const { loader } = useServices();
  const isLoading = loading.some((x) => x === true);

  useEffect(() => {
    loader.onLoading(id, isLoading, error);
    return () => loader.deleteEmitter(id);
  }, [error, isLoading, loader, id]);
}
