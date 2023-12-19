import type { RefObject } from "react";
import { useEffect, useRef, useCallback } from "react";

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

/** Fires a callback on intersection with target. */
export function useIntersectionObserver(
  target: RefObject<HTMLElement>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = defaultOptions,
) {
  const { root, rootMargin, threshold } = options;
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  });

  const handle = useCallback<IntersectionObserverCallback>((...args) => {
    return cbRef.current?.(...args);
  }, []);

  useEffect(() => {
    if (target.current) {
      const observer = new IntersectionObserver(handle, {
        root,
        rootMargin,
        threshold,
      });
      // Observer the target we passed in.
      observer.observe(target.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [target, handle, root, rootMargin, threshold]);
}
