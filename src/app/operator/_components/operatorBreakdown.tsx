import Image from "next/image";
import Link from "next/link";

import type { BranchId, Profession, ProfessionId } from "@/data/types/AKClass";
import type { Operator } from "@/data/types/AKCharacter";
import type { Rarity } from "@/data/types/shared";
import OperatorTable from "@/data/operator/operatorTable.json";
import { BranchTable, ProfessionMap } from "@/data/types/AKClass";
import { ProfessionTable } from "@/data/types/typesFrom";

import { type BgColor, cn } from "@/lib/style";
import PsychedelicImg from "@/components/image/PsychedelicImg";

/**
 * @description Defines the background color on the profession heading
 *  & gives a brief overview on what the profession does.
 */
const SectionsMeta = {
  Caster: {
    color: "bg-[#1D2F54]",
    description: "Units specializing in dealing ranged arts damage.",
  },
  Defender: {
    color: "bg-[#384654]",
    description:
      "Melee units with high HP & defense that act as the frontline.",
  },
  Guard: {
    color: "bg-[#472121]",
    description: "Melee units with have high HP & attack.",
  },
  Medic: {
    color: "bg-[#615122]",
    description: "Units that specialize in healing your operators.",
  },
  Sniper: {
    color: "bg-[#294032]",
    description: "Units specializing in dealing ranged physical damage.",
  },
  Specialist: {
    color: "bg-[#434541]",
    description:
      "Versatile units with traits and skills defining their use case.",
  },
  Supporter: {
    color: "bg-[#874210]",
    description:
      "Units with trait, talents, and skills that provide offensive or defensive support.",
  },
  Vanguard: {
    color: "bg-[#44366e]",
    description:
      "The only units that can generate the DP needed for deploying operators.",
  },
} as const;

/** @description Group operators by their profession & branch. */
export default function OperatorBreakdown() {
  // Set up organized data structure
  const groupedData = Object.fromEntries(
    Object.entries(ProfessionTable)
      .map(([profId, branchIds]) => [
        ProfessionMap[profId as ProfessionId],
        Object.fromEntries(branchIds.map((bId) => [bId, []])),
      ])
      .toSorted((a, b) => (a[0] as string).localeCompare(b[0] as string)),
  ) as unknown as Record<Profession, Record<BranchId, Operator[]>>;
  // Sort operators by their branch
  Object.values(OperatorTable).map((operator) => {
    groupedData[operator.profession][operator.branch].push(operator);
  });
  // Sort the operators in each branch alphabetically
  Object.keys(groupedData).map((_prof) => {
    const profession = _prof as Profession;
    Object.entries(groupedData[profession]).map(([_bId, ops]) => {
      const branchId = _bId as BranchId;
      groupedData[profession][branchId] = ops.toSorted((a, b) =>
        a.displayName.localeCompare(b.displayName),
      );
    });
  });

  return (
    <section className="mt-20 space-y-12">
      {Object.entries(groupedData).map(([prof, branches]) => (
        <ProfessionSection
          key={prof}
          profession={prof as Profession}
          branches={branches}
        />
      ))}
    </section>
  );
}

type ProfessionSectionProps = {
  profession: Profession;
  branches: Record<BranchId, Operator[]>;
};

/** @description Displays branches belonging to current profession. */
function ProfessionSection({ profession, branches }: ProfessionSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
      <div
        className={cn(
          "flex-center top-0 h-min gap-4 p-2 sm:sticky sm:flex-col sm:gap-8 sm:py-12",
          "rounded-full",
          SectionsMeta[profession].color,
        )}
      >
        <Image
          src={`/images/operator/class/${profession.toLowerCase()}.webp`}
          alt=""
          width={32}
          height={32}
          className="size-[1.75lh] sm:size-[10ch]"
        />
        <h2>{profession}</h2>
      </div>
      <div className="space-y-8">
        <p className="text-sm sm:mt-8 sm:text-base">
          {SectionsMeta[profession].description}
        </p>
        {Object.entries(branches).map(([bId, ops]) => (
          <BranchInformation
            key={bId}
            branchId={bId as BranchId}
            operators={ops}
          />
        ))}
      </div>
    </div>
  );
}

type BranchInformationProps = { branchId: BranchId; operators: Operator[] };

/** @description Display the branch trait and any operators belonging to it. */
function BranchInformation({ branchId, operators }: BranchInformationProps) {
  const branchData = BranchTable[branchId];
  return (
    <article className="space-y-2">
      <div className="flex items-center gap-2 text-xl">
        <PsychedelicImg
          src={`/images/operator/subclass/sub_${branchId}_icon.webp`}
          width={32}
          height={32}
          dim
          classNames={{
            wrapper: "size-[1.75lh] shrink-0 rounded-md",
            image: "object-cover p-1",
          }}
        />
        <h3>{branchData.name}</h3>
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: branchData.trait }}
        className="whitespace-pre-line text-sm text-neutral-60"
      />
      <ul className="grid grid-cols-autoFill gap-4 [--min-col-size:7.5rem]">
        {operators.map(({ id, slug, displayName, rarity }) => (
          <li key={id}>
            <CharacterLink
              avatar={{ id, bg: getRarityBgColor(rarity) }}
              href={`/operator/${slug}`}
              name={displayName}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}

/** @description Returns a background color for the specified rarity. */
function getRarityBgColor(rarity: Rarity) {
  if (rarity === 1) return "bg-rarity-1";
  else if (rarity === 2) return "bg-rarity-2";
  else if (rarity === 3) return "bg-rarity-3";
  else if (rarity === 4) return "bg-rarity-4";
  else if (rarity === 5) return "bg-rarity-5";
  else if (rarity === 6) return "bg-rarity-6";
  throw new Error("Invalid rarity specified.");
}

type CharacterLinkProps = {
  avatar: { id: string; bg: BgColor };
  href: string;
  name: string;
};

/** @description Link component displaying the character avatar & name. */
function CharacterLink({ avatar, href, name }: CharacterLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block h-full space-y-2 rounded-md p-2 @container",
        "shadow-[0_0_2px_1px_rgba(144,144,148,0.25)]",
        "transition duration-500 ease-in-out hover:bg-white/5",
      )}
    >
      <Image
        src={`/images/character/avatar/${avatar.id}.webp`}
        alt=""
        width={32}
        height={32}
        className={cn(avatar.bg, "mx-auto aspect-square size-auto rounded-md")}
      />
      <p className="break-anywhere text-center text-[max(10px,10cqw)]">
        {name}
      </p>
    </Link>
  );
}
