"use client";
import { useInterval } from "@/hooks/useInterval";
import { useTabAsIdx, useTabsActions } from "@/components/layout/Tabs";

/**
 * @description Dummy component to automatically switch between displayed
 *  operators.
 */
export function AutoNext(props: { children: React.ReactNode }) {
  const activeIdx = useTabAsIdx();
  const { nextTab } = useTabsActions();

  // Run interval once a minute
  useInterval(nextTab, 60000, { resetDependency: activeIdx });

  return <>{props.children}</>;
}
