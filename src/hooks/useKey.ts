import type { RefObject } from "react";
import { useEffect, useRef, useCallback, useMemo } from "react";

type TrackedKeyEvents = "keydown" | "keypress" | "keyup";

type Options = {
  /** Keyboard events that we can listen to. */
  eventTypes: TrackedKeyEvents[];
  /** Defaults to window object as target. */
  target?: RefObject<HTMLElement>;
};

type Callback = (event: KeyboardEvent) => void;

const defaultOptions: Options = { eventTypes: ["keydown"] };

/** Fires a callback on keyboard events. */
export function useKey(
  keys: Array<string | number> | string | number,
  callback: (e: KeyboardEvent) => void,
  options?: Options,
) {
  const keyList: Array<string | number> = useMemo(() => {
    if (Array.isArray(keys)) return keys;
    else return [keys];
  }, [keys]);
  const internalOptions = useMemo(() => {
    return { ...defaultOptions, ...options };
  }, [options]);
  const { eventTypes, target } = internalOptions;
  const cbRef = useRef<Callback>(callback);

  useEffect(() => {
    cbRef.current = callback;
  });

  const handle = useCallback(
    (e: KeyboardEvent) => {
      if (keyList.some((key) => key === e.code)) cbRef.current(e);
    },
    [keyList],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (target) {
        const targetNode = target.current;
        if (targetNode) {
          eventTypes.forEach((eventType) => {
            targetNode.addEventListener(eventType, handle);
          });
          return () => {
            eventTypes.forEach((eventType) => {
              targetNode.removeEventListener(eventType, handle);
            });
          };
        }
      } else {
        eventTypes.forEach((eventType) => {
          window.addEventListener(eventType, handle);
        });
        return () => {
          eventTypes.forEach((eventType) => {
            window.removeEventListener(eventType, handle);
          });
        };
      }
    }
  }, [eventTypes, keyList, target, callback, handle]);
}
