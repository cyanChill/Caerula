import Image from "next/image";

import type { BranchId, Profession } from "@/data/types/AKClass";
import OperatorTable from "@/data/operator/operatorTable.json";
import { BranchTable, ProfessionMap } from "@/data/types/AKClass";

import { cn } from "@/lib/style";
import PsychedelicImg from "@/components/image/PsychedelicImg";
import { CharacterLink } from "@/features/characters/Link";
import { getRarityColor } from "@/features/characters/utils";

/**
 * @description Defines a theme color for a profession along w/ noting
 *  the characteristics.
 */
const ProfessionMetaTable = {
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

/** @description Organize operators by their profession & branch. */
export default function OperatorList() {
  return (
    <section aria-label="Operator List" className="z-0 space-y-12">
      {Object.values(ProfessionMap)
        .toSorted((a, b) => a.localeCompare(b))
        .map((prof) => (
          <ProfessionSection key={prof} profession={prof} />
        ))}
    </section>
  );
}

/** @description Displays branches belonging to current profession. */
function ProfessionSection({ profession }: { profession: Profession }) {
  const profLower = profession.toLowerCase();
  const branchIds = Object.values(BranchTable)
    .filter((b) => b.profession === profession)
    .toSorted((a, b) => a.name.localeCompare(b.name))
    .map(({ id }) => id);

  return (
    <section
      aria-labelledby={profLower}
      className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]"
    >
      <div
        className={cn(
          "flex-center top-4 h-min gap-4 sm:sticky sm:flex-col sm:gap-10",
          "rounded-full p-2 sm:py-8 sm:text-xs",
          ProfessionMetaTable[profession].color,
        )}
      >
        <Image
          src={`/images/operator/class/${profLower}.webp`}
          alt=""
          width={32}
          height={32}
          className="size-[1.75lh] sm:size-[10ch]"
        />
        <h2 id={profLower} className="scroll-mt-8 sm:scroll-mt-36">
          {profession}
        </h2>
      </div>

      <div className="space-y-8">
        <p className="font-geist-sans text-sm sm:mt-8 sm:text-base">
          {ProfessionMetaTable[profession].description}
        </p>
        {branchIds.map((bId) => (
          <BranchInformation key={bId} branchId={bId} />
        ))}
      </div>
    </section>
  );
}

/** @description Display the branch trait and any operators belonging to it. */
function BranchInformation({ branchId }: { branchId: BranchId }) {
  const branchData = BranchTable[branchId];
  const operators = Object.values(OperatorTable)
    .filter(({ branch }) => branch === branchId)
    .toSorted((a, b) => a.displayName.localeCompare(b.displayName));

  return (
    <article aria-labelledby={branchId} className="space-y-2">
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
        <h3 id={branchId} className="scroll-mt-8">
          {branchData.name}
        </h3>
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: branchData.trait }}
        className="whitespace-pre-line font-geist-sans text-sm text-neutral-60"
      />

      <ul
        className={cn(
          "grid grid-cols-autoFill gap-2 [--min-col-size:13ch] sm:gap-4",
          "text-[10px] sm:text-xs",
        )}
      >
        {operators.map(({ id, slug, displayName, rarity }) => (
          <li key={id}>
            <CharacterLink
              avatar={{ id, bg: getRarityColor(rarity).bg }}
              href={`/operator/${slug}`}
              name={displayName}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
