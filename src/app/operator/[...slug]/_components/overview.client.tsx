"use client";
import { createContext, useContext, useRef } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn as useStore } from "zustand/traditional";
import Image from "next/image";

import type { Skin, SkinId } from "@/data/types/AKSkin";

import { cn } from "@/lib/style";
import PsychedelicImg from "@/components/image/PsychedelicImg";
import Tabs, { Tab, TabList, useTabAsIdx } from "@/components/layout/Tabs";
import ScrollShadow from "@/components/layout/ScrollShadow";

type SkinProps = { initId: string };
type SkinState = { skinId: string; setSkinId: (id: string) => void };
type SkinStore = ReturnType<typeof createSkinStore>;

const createSkinStore = ({ initId }: SkinProps) => {
  return createStore<SkinState>()((set) => ({
    skinId: initId,
    setSkinId: (id: string) => set(() => ({ skinId: id })),
  }));
};

const SkinContext = createContext<SkinStore | null>(null);

/** @description Use context with Zustand to make a non-global store. */
function SkinProvider({
  children,
  ...props
}: React.PropsWithChildren<SkinProps>) {
  const storeRef = useRef<SkinStore>();
  if (!storeRef.current) storeRef.current = createSkinStore(props);
  return (
    <SkinContext.Provider value={storeRef.current}>
      {children}
    </SkinContext.Provider>
  );
}

/** @description Internal hook for accessing context. */
function useSkinStore<T>(selector: (state: SkinState) => T): T {
  const store = useContext(SkinContext);
  if (!store) throw new Error("Cannot use outside of SkinProvider.");
  return useStore(store, selector);
}

/* Export selectors manually to prevent subscribing to the entire store. */
export const useSkinId = () => useSkinStore((s) => s.skinId);
export const useSetSkinId = () => useSkinStore((s) => s.setSkinId);

type OverviewProviderProps = { skinIds: SkinId[]; children: React.ReactNode };

/** @description Context provider for current skin. */
export function OverviewProvider({ skinIds, children }: OverviewProviderProps) {
  return (
    <SkinProvider initId={skinIds[0]}>
      <SkinTabsProvider skinIds={skinIds}>{children}</SkinTabsProvider>
    </SkinProvider>
  );
}

/** @description Link up the SkinProvider w/ our Tabs store. */
function SkinTabsProvider({ skinIds, children }: OverviewProviderProps) {
  const setSkinId = useSetSkinId();
  const storeData = skinIds.map((id) => ({ id }));
  return (
    <Tabs storeId="overview" dataStore={storeData} onChange={setSkinId}>
      {children}
    </Tabs>
  );
}

/** @description A more customized version of `<PsychedelicImg />`. */
export function HeroImage() {
  const id = useSkinId();
  const baseAttributes = {
    src: `/images/character/skin/${encodeURIComponent(id)}b.webp`,
    width: 512,
    height: 512,
  };
  return (
    <div
      aria-hidden="true"
      className="relative overflow-clip rounded-[2rem] @container"
    >
      <Image
        {...baseAttributes}
        alt=""
        style={{
          backgroundImage:
            "linear-gradient(to top, #00060E, #00060E00)," +
            "linear-gradient(to top right, #3B738780, #53528780)",
        }}
        className="h-[calc(40cqw+6rem)] min-h-80 w-full object-contain p-1 pb-24 backdrop-blur-xl"
      />
      {/* Background blur image */}
      <Image
        {...baseAttributes}
        alt=""
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 -z-[1]",
          "origin-top -translate-x-1/2 scale-[250%]",
        )}
      />
    </div>
  );
}

/**
 * @description Tablist to switch between what outfit information should
 *  be displayed.
 */
export function OutfitCarousel(props: { name: string; skins: Skin[] }) {
  const activeIdx = useTabAsIdx();
  return (
    <ScrollShadow color="#00060E">
      <TabList
        label={`${props.name} Outfit List`}
        className="no-scrollbar flex gap-4 overflow-x-scroll px-4 py-8 lg:px-16"
      >
        {props.skins.map((skin, idx) => (
          <Tab
            key={skin.id}
            id={skin.id}
            label={skin.name}
            activeClass="aspect-[3/2]"
            className={cn(
              "aspect-[3/8] h-32 shrink-0 overflow-clip sm:h-64",
              "rounded-3xl outline-0 ring-white drop-shadow-xl",
              "transition-[aspect-ratio] duration-500 hover:ring-2 focus:ring-2",
              { "aspect-[3/4]": idx === activeIdx - 1 },
            )}
          >
            <PsychedelicImg
              src={`/images/character/skin/${encodeURIComponent(skin.id)}b.webp`}
              width={128}
              height={128}
              dim
              classNames={{ wrapper: "size-full", image: "object-cover" }}
            />
          </Tab>
        ))}
      </TabList>
    </ScrollShadow>
  );
}
