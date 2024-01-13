"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";

import type { OperatorId } from "@/data/types/AKCharacter";
import type { Skin, SkinId } from "@/data/types/AKSkin";
import { type CharacterVoice, VoiceLangTable } from "@/data/types/AKVoice";

import { useTabListEvents } from "@/hooks/useTabListEvents";

import { cn } from "@/lib/style";
import { capitalize } from "@/utils/typedStrings";
import PsychedelicImg from "@/components/image/PsychedelicImg";
import ArtistChips from "@/features/skins/ArtistChips";

type OverviewContextType = {
  displaySkin: (id: SkinId) => void;
  skins: Skin[];
  // List of the "active" values
  id: SkinId;
  skin: Skin;
  cv: CharacterVoice[] | undefined;
};

const OverviewContext = createContext<OverviewContextType | null>(null);

/**
 * @description Keeps track of the current displayed skin along with its
 *  relationship with the character voice.
 */
export function OverviewProvider({
  id,
  skins,
  cvTable,
  children,
}: {
  id: OperatorId;
  skins: Skin[];
  cvTable: Record<string, CharacterVoice[]>;
  children: React.ReactNode;
}) {
  const [currSkinId, setCurrSkinId] = useState(skins[0].id);

  /** Wrapper to make sure we can display the specified skin. */
  const displaySkin = useCallback(
    (id: SkinId) => {
      if (!skins.find((skin) => skin.id === id)) return;
      setCurrSkinId(id);
    },
    [skins],
  );

  return (
    <OverviewContext.Provider
      value={{
        id: currSkinId,
        skin: skins.find((skin) => skin.id === currSkinId)!,
        cv: cvTable[currSkinId] ? cvTable[currSkinId] : cvTable[id],
        displaySkin,
        skins,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
}

/** @description Hook to interface with our "Overview Context". */
function useOverviewContext() {
  const value = useContext(OverviewContext);
  if (value === null) throw new Error("Can't use outside of OverviewProvder.");
  return value;
}

interface Props {
  name: string;
  position: string;
  tags: string[];
}

/** @description Combines the different portions of the overview together. */
export default function Overview({ name, position, tags }: Props) {
  const { id } = useOverviewContext();
  return (
    <>
      <HeroImage />
      <fieldset
        role="presentation"
        className={cn(
          "mx-auto -mt-20 max-w-screen-xl pb-4 @container @sm/main:w-[95cqw] @5xl/main:pb-16",
          "rounded-2xl border-2 border-white/50 @2xl/main:rounded-3xl",
        )}
      >
        <legend role="presentation" className="mx-auto max-w-[90cqw]">
          <h1
            className={cn(
              "break-anywhere w-fit px-[1ch] text-[clamp(1.75rem,12cqw,4.5rem)]",
              "text-center font-geist-sans font-bold leading-none",
            )}
          >
            {name}
          </h1>
        </legend>

        <p className="break-anywhere mx-auto max-w-[90cqw] pt-4 text-center text-neutral-60 @5xl/main:text-xl">
          {[capitalize(position.toLowerCase()), ...tags].join(" • ")}
        </p>

        <SkinCarousel name={name} />

        {/* Textual content of the overview section. */}
        <div
          id={`overview-tp-${id}`}
          role="tabpanel"
          aria-labelledby={`overview-tt-${id}`}
          className="px-4 @container @5xl/main:px-16"
        >
          <div className="grid @2xl:grid-cols-[minmax(0,1fr),12.5rem]">
            <SkinInfo />
            <CVList />
          </div>
        </div>
      </fieldset>
    </>
  );
}

/** @description A more customized version of `<PsychedelicImg />`. */
function HeroImage() {
  const { skin } = useOverviewContext();
  return (
    <div
      aria-hidden="true"
      className="relative overflow-clip rounded-[2rem] @container"
    >
      <Image
        src={`/images/operator/skin/${encodeURIComponent(skin.id)}b.webp`}
        alt=""
        width={512}
        height={512}
        style={{
          backgroundImage:
            "linear-gradient(to top, #00060E, #00060E00)," +
            "linear-gradient(to top right, #3B738780, #53528780)",
        }}
        className="h-[calc(40cqw+6rem)] min-h-80 w-full object-contain p-1 pb-24 backdrop-blur-xl"
      />
      {/* Background blur image */}
      <Image
        src={`/images/operator/skin/${encodeURIComponent(skin.id)}b.webp`}
        alt=""
        width={512}
        height={512}
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 -z-[1]",
          "origin-top -translate-x-1/2 scale-[250%]",
        )}
      />
    </div>
  );
}

/** @description List of skins the operator has. */
function SkinCarousel({ name }: { name: string }) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const [currIdx, _setIdx] = useState(0);
  const { skins, displaySkin } = useOverviewContext();

  /**
   * Allows us to use `useTabListEvents()` where we determine the
   * selected value by an "id" instead of index value.
   */
  const setIdx = useCallback(
    (idx: number | ((prev: number) => number)) => {
      _setIdx(idx);
      if (typeof idx === "number") displaySkin(skins[idx].id);
      else displaySkin(skins[idx(currIdx)].id);
    },
    [displaySkin, skins, currIdx],
  );
  useTabListEvents(tabListRef, setIdx, { tabCount: skins.length });

  return (
    <div
      className={cn(
        "relative",
        "before:absolute before:left-0 before:top-0 before:z-[1] before:h-full before:w-2 @5xl/main:before:w-14",
        "before:bg-gradient-to-r before:from-surface before:to-surface/0 before:backdrop-blur-sm",
        "after:absolute after:right-0 after:top-0 after:z-[1] after:h-full after:w-2 @5xl/main:after:w-14",
        "after:bg-gradient-to-l after:from-surface after:to-surface/0 after:backdrop-blur-sm",
      )}
    >
      <div
        ref={tabListRef}
        role="tablist"
        aria-label={`${name} Skin List`}
        aria-orientation="horizontal"
        className="no-scrollbar flex gap-4 overflow-x-scroll px-4 py-8 @5xl/main:px-16"
      >
        {skins.map((skin, idx) => (
          <button
            key={skin.id}
            id={`overview-tt-${skin.id}`}
            type="button"
            role="tab"
            aria-label={skin.name}
            aria-selected={idx === currIdx}
            aria-controls={`overview-tp-${skin.id}`}
            tabIndex={idx === currIdx ? 0 : -1}
            onClick={() => setIdx(idx)}
            className={cn(
              "aspect-[3/8] h-32 shrink-0 overflow-clip @xl/main:h-64",
              "rounded-3xl outline-0 ring-white drop-shadow-xl",
              "transition-[aspect-ratio] duration-500 hover:ring-2 focus:ring-2",
              {
                "aspect-[3/4]": idx === currIdx - 1,
                "aspect-[3/2]": idx === currIdx,
              },
            )}
          >
            <PsychedelicImg
              src={`/images/operator/skin/${encodeURIComponent(skin.id)}b.webp`}
              width={128}
              height={128}
              dim
              classNames={{ wrapper: "size-full", image: "object-cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/** @description Displays information about the displayed skin. */
function SkinInfo() {
  const { skin } = useOverviewContext();
  return (
    <section
      aria-label="Skin Info"
      className="break-anywhere min-w-0 pb-4 @2xl:p-4"
    >
      <h2 className="mb-2 text-2xl @sm:text-3xl">{skin.name}</h2>
      <ul
        aria-label="Artists"
        className="mb-4 flex flex-wrap gap-1.5 text-sm @2xl:text-base"
      >
        <ArtistChips artists={skin.artists} asList />
      </ul>
      <p className="mb-2 text-sm text-neutral-80 @2xl:text-base">
        {skin.description}
      </p>
      <SkinBrand skin={skin} />
    </section>
  );
}

/** @description Returns the correct brand image for the displayed skin. */
function SkinBrand({ skin }: { skin: Skin }) {
  let src = `/images/operator`;
  if (skin.subBrand.id.startsWith("ILLUST_")) {
    src += `/ui/elite/${skin.subBrand.id.at(-1)}.webp`;
  } else if (skin.brandId === "crossover") {
    src += `/skingroup/collab/${encodeURIComponent(skin.subBrand.id)}.webp`;
  } else {
    src += `/skingroup/${skin.brandId}.webp`;
  }

  return (
    <Image
      src={src}
      alt=""
      width={48}
      height={48}
      className="ml-auto h-12 w-auto object-contain @2xl:h-16"
    />
  );
}

/** @description Lists the character voices based on the displayed skin. */
function CVList() {
  const { cv } = useOverviewContext();
  return (
    <div className="border-t border-neutral-20 @2xl:border-l @2xl:border-t-0">
      <ul
        aria-label="Character Voices"
        className="grid h-min grid-cols-autoFill gap-2 px-2 py-4 [--min-col-size:12.5rem] @2xl:px-4"
      >
        {cv?.map(({ langId, actors }) => (
          <li key={langId} className="*:block">
            <span className="text-neutral-80 @2xl:text-lg">
              {VoiceLangTable[langId]}
            </span>
            <span className="text-sm text-neutral-60 @2xl:text-base">
              {actors.join(",")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
