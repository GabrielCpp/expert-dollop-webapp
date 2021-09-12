import { EventEmitter } from "fbemitter";
import { noop } from "lodash";
import { useEffect, useRef } from "react";
import { useServices } from "../service-context";

export interface FeedEvent {
  type: string;
  payload: unknown;
}

export interface FeedMediator {
  add(id: string): void;
  fire(id: string, event: FeedEvent): void;
  remove(id: string): void;
  subscribe(id: string, handler: (event: FeedEvent) => void): () => void;
}

export interface ObservableFeedServices {
  feeds: FeedMediator;
}

export class ObservableFeed implements FeedMediator {
  private feeds = new Map<string, EventEmitter>();

  public add(id: string): EventEmitter {
    let feed = this.feeds.get(id);

    if (feed === undefined) {
      feed = new EventEmitter();
      this.feeds.set(id, feed);
    }

    return feed;
  }

  public subscribe(
    id: string,
    handler: (event: FeedEvent) => void
  ): () => void {
    let feed = this.add(id);
    const subcription = feed.addListener("fire", handler);
    return () => subcription.remove();
  }

  public remove(id: string): void {
    let feed = this.feeds.get(id);

    if (feed !== undefined && feed.listeners("fire").length === 0) {
      this.feeds.delete(id);
    }
  }

  public fire(id: string, event: FeedEvent): void {
    let feed = this.feeds.get(id);

    if (feed !== undefined) {
      feed.emit("fire", event);
    }
  }
}

export function useFeed(id: string) {
  const { feeds } = useServices<ObservableFeedServices>();
  const fire = useRef<{ fire: (event: FeedEvent) => void }>({
    fire: noop,
  });

  useEffect(() => {
    feeds.add(id);
    const eventNotifier = fire.current;
    fire.current.fire = (event: FeedEvent) => {
      feeds.fire(id, event);
    };

    return () => {
      eventNotifier.fire = noop;
      feeds.remove(id);
    };
  }, [id, feeds]);

  return fire.current;
}

export function useWatchFeed(id: string, onEvent: (event: FeedEvent) => void) {
  const { feeds } = useServices<ObservableFeedServices>();
  const myFeed = useRef<() => void>(noop);

  useEffect(() => {
    const unsubcribe = feeds.subscribe(id, onEvent);
    myFeed.current = unsubcribe;

    return () => {
      unsubcribe();
      feeds.remove(id);
    };
  }, [id, feeds, onEvent]);
}
