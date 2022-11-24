import { EventEmitter } from "fbemitter";
import { LoaderNotifier } from "../services-def";
import { v4 as uuid4 } from "uuid";
import { head } from "lodash";

interface ComponentLoadingState {
  isLoading: boolean;
  error?: Error;
}

export class LoaderService implements LoaderNotifier {
  private triggerEmitter = new EventEmitter();
  private emitters = new Map<string, boolean>();
  private timeoutId: NodeJS.Timeout | null = null
  public loading = false;
  public errors: Error[] = []
  public pageFailed: boolean = false


  public constructor() {
    this.onLoading = this.onLoading.bind(this);
  }

  waitFor<T extends unknown>(c: () => Promise<T>): Promise<void | T> {
    const id = uuid4();
    this.onLoading(id, true);
    return c()
      .then((r: T) => {
        this.onLoading(id, false);
        return r;
      })
      .catch((error) => this.onError(error, id));
  }

  addHandler(handler: (isLoading: boolean, error?: Error) => void): () => void {
    const subscription = this.triggerEmitter.addListener("fire", handler);
    return () => subscription.remove();
  }

  onLoading(id: string, isLoading: boolean): () => void {
    if(isLoading) {
      this.emitters.set(id, isLoading);
    }
    else {
      this.emitters.delete(id);
    }
  
    this.notify();

    return () => this.emitters.delete(id)
  }

  onError(error?: Error, id?: string): void {
    if(error) {
      this.errors.push(error)
      this.emitters.delete(id || "");
      this.notify();
    }   
  }

  notify(): void {
    if(this.pageFailed) {
      return
    }

    if(this.errors.length > 0) {
      this.pageFailed = true
      this.loading = false
      this.triggerEmitter.emit("fire", false, head(this.errors));
      return
    }

    let someIsLoading: boolean = false;

    for (const loading of this.emitters.values()) {
      someIsLoading = someIsLoading || loading;
    }

    if (someIsLoading === this.loading) {
      return 
    }

    this.loading = someIsLoading;

    if(this.timeoutId !== null) {
      clearTimeout(this.timeoutId)
    }
    
    this.timeoutId = setTimeout(() => {
      console.log(this.loading)
      this.timeoutId  = null
      if (someIsLoading === this.loading) {
        this.triggerEmitter.emit("fire", this.loading, head(this.errors));
      }
    }, 100);
  }
}
