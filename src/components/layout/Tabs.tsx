"use client";
import { createContext, useContext, useRef, useCallback } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn as useStore } from "zustand/traditional";

import { useKey } from "@/hooks/useKey";

import { type WithCSS, cn } from "@/lib/style";

type TabData = { id: string } & Record<string, unknown>;

interface TabsProps {
  storeId: string;
  /** Data we want to expose that can be used by other components under the provider. */
  dataStore: TabData[];
  /**
   * Callback function that triggers when we switch tabs. Useful when we're
   * integrating with a different store/context.
   */
  onChange?: (id: string) => void;
}

interface TabsState extends TabsProps {
  tabKeys: string[];

  tab: string;
  tabAsIdx: number;
  tabData: TabData;

  actions: {
    nextTab: () => void;
    prevTab: () => void;
    selectTab: (id: string) => void;
  };
}

type TabsStore = ReturnType<typeof createTabStore>;

const createTabStore = (initProps: TabsProps) => {
  const initTab = initProps.dataStore[0];
  const initInferredVals = {
    tabKeys: initProps.dataStore.map(({ id }) => id),
    tab: initTab.id,
    tabAsIdx: 0,
    tabData: initTab,
  };

  return createStore<TabsState>()((set) => ({
    ...initProps,
    ...initInferredVals,
    actions: {
      nextTab: () =>
        set(({ dataStore, tabAsIdx, onChange }) => {
          const newIdx = tabAsIdx === dataStore.length - 1 ? 0 : tabAsIdx + 1;
          const newTabData = dataStore[newIdx];
          if (onChange) onChange(newTabData.id);
          return { tab: newTabData.id, tabAsIdx: newIdx, tabData: newTabData };
        }),
      prevTab: () =>
        set(({ dataStore, tabAsIdx, onChange }) => {
          const newIdx = tabAsIdx === 0 ? dataStore.length - 1 : tabAsIdx - 1;
          const newTabData = dataStore[newIdx];
          if (onChange) onChange(newTabData.id);
          return { tab: newTabData.id, tabAsIdx: newIdx, tabData: newTabData };
        }),
      selectTab: (newTabId: string) =>
        set(({ dataStore, tab, onChange }) => {
          const newTabData = dataStore.find(({ id }) => id === newTabId);
          if (!newTabData || newTabId === tab) return {};
          const newIdx = dataStore.findIndex(({ id }) => id === newTabId);
          if (onChange) onChange(newTabId);
          return { tab: newTabData.id, tabAsIdx: newIdx, tabData: newTabData };
        }),
    },
  }));
};

const TabsContext = createContext<TabsStore | null>(null);

/**
 * @description The context provider of this namespace component. All
 *  tab-related components must be under this.
 */
function Tabs({ children, ...props }: React.PropsWithChildren<TabsProps>) {
  const storeRef = useRef<TabsStore>();
  if (!storeRef.current) storeRef.current = createTabStore(props);
  return (
    <TabsContext.Provider value={storeRef.current}>
      {children}
    </TabsContext.Provider>
  );
}

/** @description Internal hook for accessing context. */
function useTabsStore<T>(selector: (state: TabsState) => T): T {
  const store = useContext(TabsContext);
  if (!store) throw new Error("Cannot use outside of TabsProvider.");
  return useStore(store, selector);
}

/* Export selectors manually to prevent subscribing to the entire store. */
export const useStoreId = () => useTabsStore((s) => s.storeId);
export const useDataStore = () => useTabsStore((s) => s.dataStore);
export const useTabKeys = () => useTabsStore((s) => s.tabKeys);

export const useTab = () => useTabsStore((s) => s.tab);
export const useTabAsIdx = () => useTabsStore((s) => s.tabAsIdx);
export const useTabData = () => useTabsStore((s) => s.tabData);

export const useTabsActions = () => useTabsStore((s) => s.actions);

/* Components that utilize our Tabs Store. */
type BaseTabProps = WithCSS<React.PropsWithChildren<{ id: string }>>;

/**
 * @description An unstyled `<div />` that provides the keyboard navigation
 *  of a tablist. Its children should only be `<Tabs.Tab />` components.
 */
function TabList({
  orientation = "horizontal",
  children,
  ...props
}: WithCSS<{
  orientation?: "horizontal" | "vertical";
  label?: string;
  children: React.ReactNode;
}>) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const tabKeys = useTabKeys();
  const activeIdx = useTabAsIdx();
  const { nextTab, prevTab, selectTab } = useTabsActions();

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
function Tab({ id, children, ...props }: SingleTabProps) {
  const storeId = useStoreId();
  const tab = useTab();
  const { selectTab } = useTabsActions();
  return (
    <button
      id={`${storeId}-tt-${id}`}
      type="button"
      role="tab"
      {...(props.label ? { "aria-label": props.label } : {})}
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

/** @description Unstyled `<div />` containing content of the current tab. */
function TabPanel({ id, children, ...props }: BaseTabProps) {
  const storeId = useStoreId();
  const tab = useTab();
  if (id !== tab) return null;
  return (
    <div
      id={`${storeId}-tp-${tab}`}
      role="tabpanel"
      aria-labelledby={`${storeId}-tt-${tab}`}
      style={props.style}
      className={props.className}
    >
      {children}
    </div>
  );
}

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
