import type { RefObject } from "react";
import { useEffect, useRef, useCallback, useMemo } from "react";

type TrackedKeyEvents = "keydown" | "keypress" | "keyup";

type Options = {
  /** Keyboard events that we can listen to. */
  eventTypes?: TrackedKeyEvents[];
  /** Whether we have `e.preventDefault()` called before our callback. */
  preventDefault?: boolean;
  /** Defaults to window object as target. */
  target?: RefObject<HTMLElement>;
  /** Determines when the events will occur. */
  when?: boolean;
};

type Callback = (event: KeyboardEvent) => void;

const defaultOptions = {
  eventTypes: ["keydown"] as TrackedKeyEvents[],
  preventDefault: true,
  when: true,
};

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
  const { eventTypes, preventDefault, target, when } = internalOptions;
  const cbRef = useRef<Callback>(callback);

  useEffect(() => {
    cbRef.current = callback;
  });

  const handle = useCallback(
    (e: KeyboardEvent) => {
      if (keyList.some((key) => key === e.code)) {
        if (preventDefault) e.preventDefault();
        cbRef.current(e);
      }
    },
    [keyList, preventDefault],
  );

  useEffect(() => {
    if (when && typeof window !== "undefined") {
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
  }, [when, eventTypes, keyList, target, callback, handle]);
}
