import { useEffect, useRef, useMemo } from "react";

type Options = {
  /** A way to reset the interval. */
  resetDependency?: unknown;
  /** Whether the callback should be called immediately. */
  startImmediate?: boolean;
  /** Determines when the interval can run. */
  when?: boolean;
};

const defaultOptions = {
  startImmediate: false,
  when: true,
};

/** Calls a callback after an interval, interval timer can be reset. */
export function useInterval(
  callback: () => void,
  durationMs = 0,
  options?: Options,
) {
  const internalOptions = useMemo(() => {
    return { ...defaultOptions, ...options };
  }, [options]);
  const { resetDependency, startImmediate, when } = internalOptions;
  const cbRef = useRef<() => void>(callback);
  const canReset = useRef(resetDependency);

  useEffect(() => {
    cbRef.current = callback;
  });

  useEffect(() => {
    if (!when) return;

    const runCb = () => cbRef.current?.();

    // Prevent an instant trigger when `resetDependency` changes.
    if (startImmediate && canReset.current === resetDependency) runCb();
    else canReset.current = resetDependency;

    const interval = setInterval(runCb, durationMs);

    return () => {
      clearInterval(interval);
    };
  }, [durationMs, resetDependency, startImmediate, when]);
}
