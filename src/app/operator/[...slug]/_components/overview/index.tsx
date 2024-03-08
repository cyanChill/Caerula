import Image from "next/image";

import type { OperatorId, Operator } from "@/data/types/AKCharacter";
import type { Skin } from "@/data/types/AKSkin";
import { type CharacterVoice, VoiceLangTable } from "@/data/types/AKVoice";
import { selectedSkinIdAtom } from "./store";

import { cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import { capitalize } from "@/utils/typedStrings";
import PsychedelicImg from "@/components/image/PsychedelicImg";
import ScrollShadow from "@/components/layout/ScrollShadow";
import { Tab, TabList, TabPanel } from "@/components/layout/Tabs";
import Rarity from "@/features/characters/Rarity";
import ArtistChips from "@/features/skins/ArtistChips";
import { OperatorTypeChip } from "@/features/characters/TypeTag";
import * as Client from "./client";

type OverviewProviderProps = { skinIds: string[]; children: React.ReactNode };

/** @description Context provider for current skin. */
export function OverviewProvider({ skinIds, children }: OverviewProviderProps) {
  return (
    <HydrateAtoms atomValues={[[selectedSkinIdAtom, skinIds[0]]]}>
      <Client.SkinTabsProvider skinIds={skinIds}>
        {children}
      </Client.SkinTabsProvider>
    </HydrateAtoms>
  );
}

interface Props extends OutfitInfoProps {
  operator: {
    name: string;
    position: string;
    tags: string[];
    rarity: number;
    type: Operator["type"];
  };
}

/** @description Give an overview of the operator's outfits. */
export default function Overview({ id, operator, skins, cvTable }: Props) {
  return (
    <>
      <Client.CurrentSkinHeroImage
        imgs={Object.fromEntries(
          skins.map(({ id }) => [id, <HeroImage key={id} id={id} />]),
        )}
      />
      <fieldset
        role="presentation"
        className={cn(
          "mx-auto -mt-20 max-w-screen-xl pb-4 @container sm:w-[95cqw] lg:pb-16",
          "rounded-2xl border-2 border-white/50 sm:rounded-3xl",
        )}
      >
        <legend role="presentation" className="mx-auto max-w-[90cqw]">
          <h1
            className={cn(
              "break-anywhere w-fit px-[1ch] text-[clamp(1.75rem,12cqw,4.5rem)]",
              "text-center font-geist-sans font-bold leading-none",
            )}
          >
            {operator.name}
          </h1>
        </legend>
        <Rarity
          rarity={operator.rarity}
          size="size-4"
          className="mx-auto mt-4 w-min gap-1"
        />
        <div className="mx-2 mt-4 grid place-items-center">
          <OperatorTypeChip type={operator.type} />
        </div>
        <p className="break-anywhere mx-auto mt-4 max-w-[90cqw] text-center text-neutral-60 lg:text-xl">
          {[capitalize(operator.position.toLowerCase()), ...operator.tags].join(
            " • ",
          )}
        </p>

        <OutfitCarousel name={operator.name} skins={skins} />
        <OutfitInfo id={id} skins={skins} cvTable={cvTable} />
      </fieldset>
    </>
  );
}

/** @description A more customized version of `<PsychedelicImg />`. */
function HeroImage({ id }: { id: string }) {
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
        className="max-h-[47.5rem] min-h-80 w-full object-contain p-1 pb-24 backdrop-blur-xl"
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
function OutfitCarousel({ name, skins }: { name: string; skins: Skin[] }) {
  return (
    <ScrollShadow color="#00060E">
      <TabList
        label={`${name} Outfit List`}
        className="no-scrollbar flex gap-4 overflow-x-scroll px-4 py-8 lg:px-16"
      >
        {skins.map(({ id, name }) => (
          <Tab
            key={id}
            id={id}
            label={name}
            activeClass="aspect-[3/2]"
            className={cn(
              "aspect-[3/8] h-32 shrink-0 overflow-clip sm:h-64",
              "rounded-3xl outline-none ring-white drop-shadow-xl",
              "transition-[aspect-ratio] duration-500 hover:ring-2 focus:ring-2",
              "has-[[data-prevtab]]:aspect-[3/4]",
            )}
          >
            <PsychedelicImg
              src={`/images/character/skin/${encodeURIComponent(id)}b.webp`}
              width={128}
              height={128}
              dim
              classNames={{ wrapper: "size-full", image: "object-cover" }}
            />
            <Client.IsBeforeActiveSkin id={id} />
          </Tab>
        ))}
      </TabList>
    </ScrollShadow>
  );
}

interface OutfitInfoProps {
  id: OperatorId;
  skins: Skin[];
  cvTable: Record<string, CharacterVoice[]>;
}

/**
 * @description Display information about the current outfit along with
 *  the operator's voice actors (only 1 tabpanel will be rendered).
 */
function OutfitInfo({ id, skins, cvTable }: OutfitInfoProps) {
  return (
    <div className="px-4 @container lg:px-16">
      {skins.map((skin) => (
        <TabPanel
          key={skin.id}
          id={skin.id}
          className="grid @2xl:grid-cols-[minmax(0,1fr),13.5rem]"
        >
          <SkinInfo skin={skin} />
          <CVList cv={cvTable[skin.id] ? cvTable[skin.id] : cvTable[id]} />
        </TabPanel>
      ))}
    </div>
  );
}

/** @description Displays information about the displayed skin. */
function SkinInfo({ skin }: { skin: Skin }) {
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
      <SkinBrand brand={skin.brandId} subBrand={skin.subBrand.id} />
    </section>
  );
}

/** @description Returns the correct brand image for the displayed skin. */
function SkinBrand(props: { brand: string | null; subBrand: string }) {
  let src = `/images/character/skingroup`;
  if (props.subBrand.startsWith("ILLUST_")) {
    src += `/${props.subBrand}.webp`;
  } else if (props.brand === "crossover") {
    src += `/collab/${encodeURIComponent(props.subBrand)}.webp`;
  } else {
    src += `/${props.brand}.webp`;
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
function CVList({ cv }: { cv: CharacterVoice[] | undefined }) {
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
