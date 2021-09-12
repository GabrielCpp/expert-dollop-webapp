import { noop } from "lodash";

interface LoaderComponentState {
  emitter: (isLoading: boolean, error?: Error) => void;
  isLoading: boolean;
  error?: Error;
}

export class LoaderService {
  private triggerEffect: (isLoading: boolean, error?: Error) => void = noop;
  private loadingEmitters = new Map<string, LoaderComponentState>();
  private lastLoadingState = false;

  setEffect(handler: (isLoading: boolean, error?: Error) => void) {
    this.triggerEffect = handler;
  }

  getEmitter(id: string): (isLoading: boolean, error?: Error) => void {
    let state = this.loadingEmitters.get(id);

    if (state === undefined) {
      state = {
        isLoading: true,
        error: undefined,
        emitter: (isLoading: boolean, error?: Error) => {
          const self = this.loadingEmitters.get(id);

          if (self !== undefined) {
            self.isLoading = isLoading;
            self.error = error;
            this.notify();
          }
        },
      };

      this.loadingEmitters.set(id, state);
    }

    return state.emitter;
  }

  notify(): void {
    let isLoading: boolean = false;
    let error: Error | undefined = undefined;

    for (const state of this.loadingEmitters.values()) {
      isLoading = isLoading || state.isLoading;
      if (state.error !== undefined) {
        error = state.error;
        break;
      }
    }

    if (isLoading !== this.lastLoadingState || error) {
      this.lastLoadingState = isLoading;
      this.triggerEffect(isLoading, error);
    }
  }

  deleteEmitter(id: string): void {
    this.loadingEmitters.delete(id);
  }
}
