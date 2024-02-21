"use client";
import { useAtomValue, useSetAtom } from "jotai";

import { selectedSkinIdAtom } from "./store";

import { cn } from "@/lib/style";
import Tabs, { Tab, tabsKeysAtom } from "@/components/layout/Tabs";

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

type SkinTabProps = { id: string; name: string; children: React.ReactNode };

/** @description Tab in our `<OutfitCarousel />`. */
export function SkinTab({ id, name, children }: SkinTabProps) {
  const skinIds = useAtomValue(tabsKeysAtom);
  const activeId = useAtomValue(selectedSkinIdAtom);

  const activeIdx = skinIds.findIndex((i) => i === activeId);
  const currIdx = skinIds.findIndex((i) => i === id);
  if (currIdx === -1 || activeIdx === -1) throw new Error("Invalid skin ids.");
  const isBeforeActive = currIdx - activeIdx === -1;

  return (
    <Tab
      id={id}
      label={name}
      activeClass="aspect-[3/2]"
      className={cn(
        "aspect-[3/8] h-32 shrink-0 overflow-clip sm:h-64",
        "rounded-3xl outline-0 ring-white drop-shadow-xl",
        "transition-[aspect-ratio] duration-500 hover:ring-2 focus:ring-2",
        { "aspect-[3/4]": isBeforeActive },
      )}
    >
      {children}
    </Tab>
  );
}
