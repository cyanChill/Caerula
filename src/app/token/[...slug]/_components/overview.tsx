import Image from "next/image";

import type { TokenId } from "@/data/types/AKCharacter";
import SkinTable from "@/data/character/skinTable.json";
import TokenTable from "@/data/token/tokenTable.json";

import { cn } from "@/lib/style";
import { capitalize } from "@/utils/typedStrings";
import PsychedelicImg from "@/components/image/PsychedelicImg";
import Rarity from "@/features/characters/Rarity";

/** @description Give an overview of the tokens's outfits. */
export default function TokenOverview({ tokId }: { tokId: TokenId }) {
  const token = TokenTable[tokId];
  const skins = SkinTable.charSkinMap[tokId].map(
    (skinId) => SkinTable.skinTable[skinId],
  );

  const tokenPosition =
    token.position === "ALL"
      ? "Melee & Ranged"
      : capitalize(token.position.toLowerCase());

  return (
    <>
      <h1
        className={cn(
          "break-anywhere mb-4 mt-[5svh] px-[1ch] text-[clamp(1.5rem,12cqw,3.5rem)]",
          "text-center font-geist-sans font-bold leading-none",
        )}
      >
        {token.displayName}
      </h1>
      <Rarity
        rarity={token.rarity}
        size="size-4"
        className="mx-auto mb-2 w-min gap-1"
      />
      <p className="break-anywhere mx-auto mb-4 max-w-[90cqw] text-center text-neutral-60 lg:text-xl">
        {[tokenPosition, capitalize(token.type)].join(" • ")}
      </p>

      <ul
        className={cn(
          "mx-2 grid gap-4 @container md:grid-cols-2",
          "text-sm text-neutral-70 sm:text-base",
        )}
      >
        {skins.map(({ id, name, imgAlt, brandId, subBrand }) => (
          <li
            key={id}
            className="grid grid-cols-[3.5lh_minmax(0,1fr)_auto] items-center gap-2"
          >
            <PsychedelicImg
              src={`/images/character/avatar/${encodeURIComponent(id)}.webp`}
              alt={imgAlt}
              width={64}
              height={64}
              dim
              classNames={{
                wrapper: "size-full rounded-md",
                image: "object-cover p-0.5",
              }}
            />
            <p>{name}</p>
            <SkinBrand brand={brandId} subBrand={subBrand.id} />
          </li>
        ))}
      </ul>

      <hr className="mt-8 border-white/10" />
    </>
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
      className="h-[2lh] w-auto object-contain"
    />
  );
}
