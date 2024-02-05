import Image from "next/image";

import type { OperatorId } from "@/data/types/AKCharacter";
import type { Skin } from "@/data/types/AKSkin";
import { type CharacterVoice, VoiceLangTable } from "@/data/types/AKVoice";

import { cn } from "@/lib/style";
import { capitalize } from "@/utils/typedStrings";
import { TabPanel } from "@/components/layout/Tabs";
import Rarity from "@/features/characters/Rarity";
import ArtistChips from "@/features/skins/ArtistChips";
import { HeroImage, OutfitCarousel } from "./overview.client";

interface Props extends OutfitInfoProps {
  operator: {
    name: string;
    position: string;
    tags: string[];
    rarity: number;
  };
}

/** @description Give an overview of the operator's outfits. */
export default function Overview({ id, operator, skins, cvTable }: Props) {
  return (
    <>
      <HeroImage />
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
          className="mx-auto w-min gap-1 pt-4"
        />
        <p className="break-anywhere mx-auto max-w-[90cqw] pt-4 text-center text-neutral-60 lg:text-xl">
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
          className="grid @2xl:grid-cols-[minmax(0,1fr),12.5rem]"
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
