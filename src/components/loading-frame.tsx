import { Backdrop } from "@mui/material";
import React, { useCallback, useEffect } from "react";
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
      isLoading: props.loader.lastLoadingState,
      lastError: undefined,
    };
    props.loader.addHandler(this.onLoading.bind(this));
  }

  onLoading(_: boolean, error?: Error): void {
    if (error) {
      console.error(error);
      this.setState({
        lastError: error,
        isLoading: this.props.loader.lastLoadingState,
      });
    } else {
      this.setState({
        lastError: undefined,
        isLoading: this.props.loader.lastLoadingState,
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
