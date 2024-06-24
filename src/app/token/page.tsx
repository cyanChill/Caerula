import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

import type { TokenClassification } from "@/data/types/AKCharacter";
import OperatorTable from "@/data/operator/operatorTable.json";
import TokenTable from "@/data/token/tokenTable.json";

import { cn } from "@/lib/style";
import { constructMetadata } from "@/lib/metadata";
import { CharacterLink } from "@/features/characters/Link";
import { getRarityColor } from "@/features/characters/utils";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return constructMetadata({
    parentMetadata: await parent,
    title: "Tokens",
    description:
      "References to the summons, traps, reinforcements, and support devices used by operators.",
    route: "/token",
  });
}

const TokenTypes = [
  "summon",
  "trap",
  "reinforcement",
  "support",
  "other",
] as const;

/** @description Descriptions for each TokenType. */
const TokenMetaTable = {
  summon: `A broad group units that provide offensive or supportive capabilities. Most of the offensive summons contribute to the Deployment Limit.`,
  trap: `Traps are usually manually deployed (with some special cases) and can be placed on tiles without a ground unit on it (can be placed if a levitating enemy is above the tile). They are invulnerable, don't contribute to the Deployment Limit (however have a limit on how many can be deployed at once), and are obtained from skills. They are triggered when a non-invisible ground enemy is too close to it.`,
  reinforcement: `Reinforcements are used by Tacticians and can only be deployed on a tile in their attack range which gets designated as the "Tactical Point". Tacticians will deal more damage to enemies blocked by their Reinforcements. They cost no DP to deploy, don't contribute to the Deployment Limit, and can be retreated & redeployed after a certain period of time. When defeated, they revive after a certain period of time, in which they invulnerable but can't attack or block enemies.`,
  support: `Support Devices are used by Artificer to support operators. They don't contribute to the Deployment Limit (however have a limit on how many can be deployed at once) and self-destruct after a certain period of time.`,
  other: `These are tokens that don't fit in any of the other categoires. "Tide-Hunt Knight" for example is automatically summoned in Mizuki & Caerula Arbor if the player has the "Breath of the Tide" collectible`,
};

export default function Tokens() {
  return (
    <main className="mx-auto mb-[5svh] max-w-screen-2xl p-2 sm:px-8">
      <h1 className="mb-8 mt-[15svh] text-4xl font-semibold sm:mt-[25svh] sm:text-5xl md:text-7xl">
        Token
      </h1>
      <p className="font-geist-sans text-sm text-neutral-70 sm:text-base md:text-xl">
        Tokens are units deployable be some operators and can be primarily be
        classified by one of the 4 categories describing its use case: Summon,
        Trap, Reinforcement, or Support Device.
      </p>

      <div className="mt-20 space-y-12">
        {TokenTypes.map((type) => (
          <ClassificationSection key={type} type={type} />
        ))}
      </div>
    </main>
  );
}

function ClassificationSection({ type }: { type: TokenClassification }) {
  const tokens = Object.values(TokenTable).filter((t) => t.type === type);
  const tokenOwners = [...new Set(tokens.map(({ usedBy }) => usedBy))];
  // Sort ids by the operator's name
  const sortedOpTokenOwners = tokenOwners
    .filter((id) => !!id)
    .map((id) => ({ id, name: OperatorTable[id].displayName }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ id }) => id);

  return (
    <section aria-labelledby={type} className="space-y-2">
      <h2 id={type} className="scroll-mt-8 text-2xl capitalize sm:text-3xl">
        {type}s
      </h2>
      <p
        dangerouslySetInnerHTML={{ __html: TokenMetaTable[type] }}
        className="whitespace-pre-line font-geist-sans text-sm text-neutral-60 sm:text-base"
      />

      {sortedOpTokenOwners.length > 0 && (
        <ul className="grid grid-cols-autoFill gap-x-2 gap-y-3 [--min-col-size:15rem]">
          {sortedOpTokenOwners.map((opId) => (
            <li key={opId} className="space-y-4 @container">
              <Link
                href={`/operator/${OperatorTable[opId].slug}`}
                className={cn(
                  "grid grid-cols-[auto_minmax(0,1fr)] items-center rounded-md",
                  "text-xs transition duration-300 ease-in-out sm:text-sm",
                  "bg-neutral-10 hover:bg-neutralAlt-20",
                )}
              >
                <Image
                  src={`/images/character/avatar/${opId}.webp`}
                  alt=""
                  width={16}
                  height={16}
                  className={cn(
                    "size-[2.5lh] rounded-md",
                    getRarityColor(OperatorTable[opId].rarity).bg,
                  )}
                />
                <p className="px-2">{OperatorTable[opId].displayName}</p>
              </Link>

              <ul className="grid grid-cols-autoFill gap-2 px-1 text-[10px] [--min-col-size:6rem] sm:text-xs">
                {tokens
                  .filter(({ usedBy }) => usedBy === opId)
                  .map(({ id, iconId, slug, displayName }) => (
                    <li key={id}>
                      <CharacterLink
                        avatar={{
                          id: iconId,
                          bg: `bg-neutralAlt-10`,
                          className: "size-[3lh]",
                        }}
                        href={`/token/${slug}`}
                        name={displayName}
                      />
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {/* Any remaining tokens that aren't used by an operator. */}
      {tokenOwners.includes(null) && (
        <ul className="grid grid-cols-autoFill gap-2 px-1 text-[10px] [--min-col-size:6rem] sm:text-xs">
          {tokens
            .filter(({ usedBy }) => !usedBy)
            .map(({ id, iconId, slug, displayName }) => (
              <li key={id}>
                <CharacterLink
                  avatar={{
                    id: iconId,
                    bg: `bg-neutralAlt-10`,
                    className: "size-[3lh]",
                  }}
                  href={`/token/${slug}`}
                  name={displayName}
                />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
