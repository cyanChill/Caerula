"use client";
import { useAtomValue, useSetAtom } from "jotai";

import { useInterval } from "@/hooks/useInterval";
import { activeTabIdxAtom, nextTabAtom } from "@/components/layout/Tabs";

/**
 * @description Dummy component to automatically switch between displayed
 *  operators.
 */
export function AutoNext() {
  const activeIdx = useAtomValue(activeTabIdxAtom);
  const nextTab = useSetAtom(nextTabAtom);

  // Run interval once a minute
  useInterval(nextTab, 60000, { resetDependency: activeIdx });

  return null;
}
