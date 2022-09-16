import { EventEmitter } from "fbemitter";

export interface Subcription {
  unsubscribe: () => void;
}

export interface Observable<T> {
  subscribe(listener: (value: T) => void): Subcription;
}

export function wrapEmitterInObservable<T>(emitter: EventEmitter, eventName: string): Observable<T> {
  return {
    subscribe: (listener: (value: T) => void) => {
      const s = emitter.addListener(eventName, listener)
      return {unsubscribe: () => s.remove()}
    }
  }
}

export class ObservableValue<T> implements Observable<T> {
  private static EVENT_NAME= "fire"
  private emitter = new EventEmitter()
  private _value: T
  
  public constructor(value: T) {
    this._value = value
  }

  public get value(): T {
    return this._value
  }

  public next(value: T) {
    this._value = value
    this.emitter.emit(ObservableValue.EVENT_NAME, value)
  }

  subscribe(listener: (value: T) => void): Subcription {
    const s = this.emitter.addListener(ObservableValue.EVENT_NAME, listener)
    return {
      unsubscribe: () => s.remove()
    }
  }
}