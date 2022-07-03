import { EventEmitter } from "fbemitter";
import { LoaderNotifier } from "../services-def";
import { v4 as uuid4 } from "uuid";

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

  waitOnPromise<T extends unknown>(p: Promise<T>): Promise<void | T> {
    const id = uuid4();
    this.onLoading(id, true);
    return p
      .then((r: T) => {
        this.onLoading(id, false);
        return r;
      })
      .catch((error) => this.onLoading(id, false, error));
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

  onError(error?: Error): void {
    this.emitters.set("global", {
      isLoading: false,
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
}
