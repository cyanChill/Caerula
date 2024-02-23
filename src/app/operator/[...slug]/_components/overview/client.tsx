"use client";
import { useAtomValue, useSetAtom } from "jotai";

import { selectedSkinIdAtom } from "./store";

import Tabs, { activeTabIdxAtom, tabsKeysAtom } from "@/components/layout/Tabs";

type SkinTabsProviderProps = { skinIds: string[]; children: React.ReactNode };

/** @description Link up the SkinProvider w/ our Tabs store. */
export function SkinTabsProvider({ skinIds, children }: SkinTabsProviderProps) {
  const setSkinId = useSetAtom(selectedSkinIdAtom);
  return (
    <Tabs storeId="overview" tabKeys={skinIds} onChange={setSkinId}>
      {children}
    </Tabs>
  );
}

type CurrentSkinHeroImageProps = { imgs: Record<string, React.ReactNode> };

/** @description Renders a hero version of the selected skin. */
export function CurrentSkinHeroImage({ imgs }: CurrentSkinHeroImageProps) {
  const id = useAtomValue(selectedSkinIdAtom);
  if (!imgs[id]) throw new Error(`No hero image for skin id: "${id}"`);
  return imgs[id];
}

/** @description Helps us indicate if a tab is before the selected tab. */
export function IsBeforeActiveSkin({ id }: { id: string }) {
  const skinIds = useAtomValue(tabsKeysAtom);
  const activeIdx = useAtomValue(activeTabIdxAtom);

  const currIdx = skinIds.findIndex((i) => i === id);
  if (currIdx === -1) throw new Error("Invalid skin id.");
  const isBeforeActive = currIdx - activeIdx === -1;

  if (!isBeforeActive) return null;
  return <div aria-hidden="true" data-prevTab className="hidden" />;
}
