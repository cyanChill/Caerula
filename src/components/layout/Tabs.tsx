"use client";
import { useRef, useCallback } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { ScopeProvider } from "jotai-scope";

import { useKey } from "@/hooks/useKey";

import { type WithCSS, cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";

const tabsStoreIdAtom = atom("");
export const tabsKeysAtom = atom<string[]>([]);

const _activeTabAtom = atom("");
export const activeTabAtom = atom(
  (get) => get(_activeTabAtom),
  (get, set, tabKey: string) => {
    // Run `onChange` if it exists when this value changes
    if (get(tabsOnChangeAtom).fn) get(tabsOnChangeAtom).fn!(tabKey);
    set(_activeTabAtom, tabKey);
  },
);
export const activeTabIdxAtom = atom((get) =>
  get(tabsKeysAtom).findIndex((tabKey) => tabKey === get(activeTabAtom)),
);

export const nextTabAtom = atom(null, (get, set) => {
  const tabKeys = get(tabsKeysAtom);
  const tabAsIdx = get(activeTabIdxAtom);
  set(
    activeTabAtom,
    tabKeys[tabAsIdx === tabKeys.length - 1 ? 0 : tabAsIdx + 1],
  );
});
export const prevTabAtom = atom(null, (get, set) => {
  const tabKeys = get(tabsKeysAtom);
  const tabAsIdx = get(activeTabIdxAtom);
  set(
    activeTabAtom,
    tabKeys[tabAsIdx === 0 ? tabKeys.length - 1 : tabAsIdx - 1],
  );
});
export const selectTabAtom = atom(null, (get, set, tabKey: string) => {
  const isKeyValid = get(tabsKeysAtom).includes(tabKey);
  if (isKeyValid) set(activeTabAtom, tabKey);
});

// Tabs config atoms
const tabsOnChangeAtom = atom<{ fn?: (id: string) => void }>({
  fn: undefined,
});
const preserveContextAtom = atom(false);

type TabsProps = {
  storeId: string;
  tabKeys: string[];
  /**
   * Callback function that triggers when we switch tabs. Useful when we're
   * integrating with a different store/context.
   */
  onChange?: (id: string) => void;
  /** If we want to preserve the state inside `<TabPanel />` when we switch tabs. */
  preserveContext?: boolean;
};

/**
 * @description The context provider of this namespace component. All
 *  tab-related components must be under this.
 */
export default function Tabs(props: React.PropsWithChildren<TabsProps>) {
  return (
    <ScopeProvider
      atoms={[
        tabsStoreIdAtom,
        tabsKeysAtom,
        tabsOnChangeAtom,
        preserveContextAtom,
        _activeTabAtom,
      ]}
    >
      <HydrateAtoms
        atomValues={[
          [tabsStoreIdAtom, props.storeId],
          [tabsKeysAtom, props.tabKeys],
          [_activeTabAtom, props.tabKeys[0]],
          [tabsOnChangeAtom, { fn: props.onChange }],
          [preserveContextAtom, !!props.preserveContext],
        ]}
      >
        {props.children}
      </HydrateAtoms>
    </ScopeProvider>
  );
}

/* Components that utilize our Tabs Store. */
type BaseStyleProps = WithCSS<{ children?: React.ReactNode }>;
type BaseTabProps = BaseStyleProps & { id: string };

/**
 * @description An unstyled `<div />` that provides the keyboard navigation
 *  of a tablist. Its children should only be `<Tabs.Tab />` components.
 */
export function TabList({
  orientation = "horizontal",
  children,
  ...props
}: WithCSS<{
  orientation?: "horizontal" | "vertical";
  label?: string;
  children: React.ReactNode;
}>) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const tabKeys = useAtomValue(tabsKeysAtom);
  const activeIdx = useAtomValue(activeTabIdxAtom);
  const nextTab = useSetAtom(nextTabAtom);
  const prevTab = useSetAtom(prevTabAtom);
  const selectTab = useSetAtom(selectTabAtom);

  const isVertical = orientation === "vertical";

  const tabCount = tabKeys.length;
  const focusTab = useCallback((idx: number) => {
    if (tabListRef.current)
      (tabListRef.current.childNodes[idx] as HTMLElement).focus();
  }, []);

  const goNext = useCallback(() => {
    focusTab((activeIdx + 1 + tabCount) % tabCount);
    nextTab();
  }, [nextTab, focusTab, activeIdx, tabCount]);
  const goPrev = useCallback(() => {
    focusTab((activeIdx - 1 + tabCount) % tabCount);
    prevTab();
  }, [prevTab, focusTab, activeIdx, tabCount]);
  const goFirst = useCallback(() => {
    focusTab(0);
    selectTab(tabKeys[0]);
  }, [selectTab, focusTab, tabKeys]);
  const goLast = useCallback(() => {
    focusTab(tabKeys.length - 1);
    selectTab(tabKeys[tabKeys.length - 1]);
  }, [selectTab, focusTab, tabKeys]);

  // View Previous Tab
  useKey("ArrowLeft", goPrev, { target: tabListRef, when: !isVertical });
  useKey("ArrowUp", goPrev, { target: tabListRef, when: isVertical });
  // View Next Tab
  useKey("ArrowRight", goNext, { target: tabListRef, when: !isVertical });
  useKey("ArrowDown", goNext, { target: tabListRef, when: isVertical });
  // Shortcuts to view first & last tabs
  useKey("Home", goFirst, { target: tabListRef });
  useKey("End", goLast, { target: tabListRef });

  return (
    <div
      ref={tabListRef}
      role="tablist"
      {...(props.label ? { "aria-label": props.label } : {})}
      aria-orientation={orientation}
      style={props.style}
      className={props.className}
    >
      {children}
    </div>
  );
}

type SingleTabProps = BaseTabProps & { label?: string; activeClass?: string };

/** @description Unstyled `<button />` to select the current tab. */
export function Tab({ id, children, ...props }: SingleTabProps) {
  const storeId = useAtomValue(tabsStoreIdAtom);
  const tab = useAtomValue(activeTabAtom);
  const selectTab = useSetAtom(selectTabAtom);
  return (
    <button
      id={`${storeId}-tt-${id}`}
      type="button"
      role="tab"
      {...(props.label
        ? { "aria-label": props.label, title: props.label }
        : {})}
      aria-selected={id === tab}
      aria-controls={`${storeId}-tp-${id}`}
      tabIndex={id === tab ? 0 : -1}
      onClick={() => selectTab(id)}
      style={props.style}
      className={cn(props.className, { [props.activeClass ?? ""]: id === tab })}
    >
      {children}
    </button>
  );
}

/** @description Allows stacking of `<TabPanel />` inside a single container. */
export function TabPanelGroup({ style, className, children }: BaseStyleProps) {
  return (
    <div style={style} className={cn(className, "grid-stack")}>
      {children}
    </div>
  );
}

/** @description Unstyled `<div />` containing content of the current tab. */
export function TabPanel({ id, children, ...props }: BaseTabProps) {
  const storeId = useAtomValue(tabsStoreIdAtom);
  const tab = useAtomValue(activeTabAtom);
  const preserveContext = useAtomValue(preserveContextAtom);
  const isSelected = id === tab;
  if (!isSelected && !preserveContext) return null;
  return (
    <div
      id={`${storeId}-tp-${tab}`}
      {...(preserveContext && !isSelected
        ? { "aria-hidden": true, hidden: true }
        : {})}
      role="tabpanel"
      aria-labelledby={`${storeId}-tt-${tab}`}
      style={props.style}
      className={cn(props.className, { hidden: !isSelected })}
    >
      {children}
    </div>
  );
}
