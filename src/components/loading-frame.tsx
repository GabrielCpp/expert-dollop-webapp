import { Backdrop } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(loader.lastLoadingState);

  useEffect(() => {
    function onLoading(_: boolean, error?: Error): void {
      if (error) {
        console.error(error);
      }

      setIsLoading(() => loader.lastLoadingState);
    }

    return loader.addHandler(onLoading);
  }, [loader]);

  return (
    <>
      {
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          {loaderComponent}
        </Backdrop>
      }
      {children}
    </>
  );
}

export function useLoaderEffect(
  error: Error | undefined,
  ...loading: boolean[]
): boolean {
  const id = useId();
  const { loader } = useServices();
  const isLoading = loading.some((x) => x === true);

  useEffect(() => {
    loader.onLoading(id, isLoading, error);
    return () => loader.deleteEmitter(id);
  }, [error, isLoading, loader, id]);

  return isLoading;
}

interface LoaderDetails {
  onLoading(loading: boolean): void;
  onError(error?: Error): void;
}

export function useLoadingNotifier(): LoaderDetails {
  const id = useId();
  const { loader } = useServices();
  const onLoading = useCallback(
    (loading: boolean) => {
      loader.onLoading(id, loading, undefined);
    },
    [loader, id]
  );
  const onError = useCallback(
    (error?: Error) => {
      if (error) {
        loader.onLoading(id, false, error);
      }
    },
    [loader, id]
  );

  return {
    onLoading,
    onError,
  };
}
