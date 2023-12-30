import type { Dispatch, RefObject, SetStateAction } from "react";
import { useMemo, useCallback } from "react";

import { useKey } from "./useKey";

type Options = {
  tabCount: number;
  isVertical?: boolean;
};

const defaultOptions = {
  tabCount: 1,
  isVertical: false,
};

/** Applies keyboard event handler for `role="tablist"` */
export function useTabListEvents(
  target: RefObject<HTMLElement>,
  setIdx: Dispatch<SetStateAction<number>>,
  options: Options,
) {
  const internalOptions = useMemo(() => {
    return { ...defaultOptions, ...options };
  }, [options]);
  const { tabCount, isVertical } = internalOptions;

  const focusTab = useCallback(
    (idx: number) => {
      if (target.current)
        (target.current.childNodes[idx] as HTMLElement).focus();
    },
    [target],
  );

  const goPrev = useCallback(
    (prev: number) => {
      focusTab((prev - 1 + tabCount) % tabCount);
      return (prev - 1 + tabCount) % tabCount;
    },
    [tabCount, focusTab],
  );
  const goNext = useCallback(
    (prev: number) => {
      focusTab((prev + 1 + tabCount) % tabCount);
      return (prev + 1 + tabCount) % tabCount;
    },
    [tabCount, focusTab],
  );
  const viewFirst = useCallback(() => {
    focusTab(0);
    return 0;
  }, [focusTab]);
  const viewLast = useCallback(() => {
    focusTab(tabCount - 1);
    return tabCount - 1;
  }, [tabCount, focusTab]);

  // View Previous Tab
  useKey("ArrowLeft", () => setIdx(goPrev), { target, when: !isVertical });
  useKey("ArrowUp", () => setIdx(goPrev), { target, when: isVertical });
  // View Next Tab
  useKey("ArrowRight", () => setIdx(goNext), { target, when: !isVertical });
  useKey("ArrowDown", () => setIdx(goNext), { target, when: isVertical });
  // Shortcuts to view first & last tabs
  useKey("Home", () => setIdx(viewFirst), { target });
  useKey("End", () => setIdx(viewLast), { target });
}
