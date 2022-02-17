import { EventEmitter } from "fbemitter";
import { LoaderNotifier } from "../services-def";

interface ComponentLoadingState {
  isLoading: boolean;
  error?: Error;
}

export class LoaderService implements LoaderNotifier {
  private triggerEmitter = new EventEmitter();
  private emitters = new Map<string, ComponentLoadingState>();
  public lastLoadingState = false;
  public lastErrorState?: Error;

  public constructor() {
    this.onLoading = this.onLoading.bind(this);
  }

  addHandler(handler: (isLoading: boolean, error?: Error) => void): () => void {
    const subscription = this.triggerEmitter.addListener("fire", handler);
    return () => subscription.remove();
  }

  onLoading(id: string, isLoading: boolean, error?: Error): void {
    this.emitters.set(id, {
      isLoading,
      error,
    });
    this.notify();
  }

  notify(): void {
    let isLoading: boolean = false;
    let error: Error | undefined = undefined;

    for (const state of this.emitters.values()) {
      isLoading = isLoading || state.isLoading;
      if (state.error !== undefined) {
        error = state.error;
        break;
      }
    }

    if (isLoading !== this.lastLoadingState || error) {
      this.lastErrorState = error;
      this.lastLoadingState = isLoading;
      setTimeout(() => {
        if (isLoading === this.lastLoadingState) {
          this.triggerEmitter.emit("fire", isLoading, error);
        }
      }, 100);
    }
  }

  deleteEmitter(id: string): void {
    this.emitters.delete(id);
  }

  uncover(): void {
    this.triggerEmitter.emit("uncover");
  }

  addUncoverHandler(handler: () => void): () => void {
    const subscription = this.triggerEmitter.addListener("uncover", handler);
    return () => subscription.remove();
  }
}
