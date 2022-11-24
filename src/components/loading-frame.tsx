import { Backdrop } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LoaderNotifier, useServices } from "../services-def";
import { useId } from "../shared/redux-db";

interface LoadingSpinnerProps {
  children: JSX.Element | JSX.Element[];
  loaderComponent: JSX.Element;
  errorComponent: (p: { error: Error }) => JSX.Element;
  loader: LoaderNotifier;
}

interface LoadingSpinnerState {
  isLoading: boolean;
  lastError: Error | undefined;
}

export class LoadingFrame extends React.Component<
  LoadingSpinnerProps,
  LoadingSpinnerState
> {
  constructor(props: LoadingSpinnerProps) {
    super(props);
    this.state = {
      isLoading: props.loader.loading,
      lastError: undefined,
    };
    props.loader.addHandler(this.onLoading.bind(this));
  }

  onLoading(loading: boolean, error?: Error): void {
    if (error) {
      console.error(error);
      this.setState({
        lastError: error,
        isLoading: loading,
      });
    } else {
      this.setState({
        lastError: undefined,
        isLoading: loading,
      });
    }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { lastError: error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.lastError) {
      const ErrorComponent = this.props.errorComponent;
      return <ErrorComponent error={this.state.lastError}></ErrorComponent>;
    }
    return (
      <>
        {
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={(this.state, this.state.isLoading)}
          >
            {this.props.loaderComponent}
          </Backdrop>
        }
        {this.props.children}
      </>
    );
  }
}

export function useLoaderEffect(
  error: Error | undefined,
  ...loaders: boolean[]
): boolean {
  const { loader } = useServices();
  const id = useId();
  const loading = loaders.some((x) => x === true);

  useEffect(() => {
    return loader.onLoading(id, loading);
  }, [error, loading, loader, id]);

  useEffect(() => {
    loader.onError(error, id);
  }, [loader, error, id]);

  return loading;
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
      loader.onLoading(id, loading);
    },
    [loader, id]
  );
  const onError = useCallback(
    (error?: Error) => {
      loader.onError(error, id);
    },
    [loader, id]
  );

  return {
    onLoading,
    onError,
  };
}

export interface RefectGroup {
  add: (f: () => Promise<unknown>) => void;
  pop: (f: () => Promise<unknown>) => void;
  refetchAll: () => Promise<void>;
}

export function useRefetchGroup() {
  const fetchers = useRef<Set<() => Promise<unknown>>>(new Set());
  const [actions] = useState<RefectGroup>(() => {
    return {
      add: (f: () => Promise<unknown>) => {
        fetchers.current.add(f);
      },
      pop: (f: () => Promise<unknown>) => {
        fetchers.current.delete(f);
      },
      refetchAll: async () => {
        await Promise.all(
          Array.from(fetchers.current.values()).map((r) => r())
        );
      },
    };
  });

  return actions;
}

export function useSharedRefetch(
  refectGroup: RefectGroup,
  f: () => Promise<unknown>
) {
  useEffect(() => {
    refectGroup.add(f);
    return () => refectGroup.pop(f);
  }, [f, refectGroup]);
}
