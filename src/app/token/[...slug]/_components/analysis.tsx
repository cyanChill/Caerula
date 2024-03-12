import type { TokenId } from "@/data/types/AKCharacter";
import OperatorTable from "@/data/operator/operatorTable.json";
import SkillTable from "@/data/character/skillTable.json";
import TokenTable from "@/data/token/tokenTable.json";

import { cn } from "@/lib/style";
import { pickKeys } from "@/utils/object";
import Card from "@/components/ui/Card";
import { getPotentialIcons } from "@/components/ui/IconList";
import type { Recipient } from "@/features/characters/Experience/store";
import Experience, {
  ExperienceProvider,
} from "@/features/characters/Experience";
import { PotentialProvider } from "@/features/characters/Potentials";
import {
  PotentialKnob,
  PotentialIcon,
} from "@/features/characters/Potentials/client";
import Skills from "@/features/characters/Skills";
import Talents from "@/features/characters/Talents";

/** @description Displays statistical information about the token. */
export default function TokenAnalysis({ tokId }: { tokId: TokenId }) {
  const { skills, statRecipients, talents, trait } =
    getTokenAnalysisContent(tokId);

  const talentUsesPotential =
    Object.keys(talents).length > 0 &&
    Object.values(talents).some((talentVar) =>
      talentVar.some((tal) => tal.potential > 1),
    );

  return (
    <ExperienceProvider recipients={statRecipients}>
      <PotentialProvider numPotentials={5}>
        <div
          className={cn(
            "grid grid-flow-dense grid-cols-2 gap-2 py-8 min-[350px]:gap-4 sm:px-4",
            "md:auto-rows-fr md:grid-cols-4 lg:grid-cols-5",
          )}
        >
          <Experience recipients={statRecipients} />
          <Talents talents={talents} short />
          <PotentialSelector render={talentUsesPotential} />
          <TokenTrait id={tokId} trait={trait} />
          <Skills skills={skills} />
        </div>
      </PotentialProvider>
    </ExperienceProvider>
  );
}

/** @description Renders only if we have a talent that improves with potential. */
function PotentialSelector({ render }: { render: boolean }) {
  if (!render) return null;
  return (
    <Card
      as="section"
      defaultPadding
      className="relative grid place-items-center bg-neutral-20/75 @container"
    >
      <PotentialKnob />
      <PotentialIcon
        icons={getPotentialIcons({
          size: 64,
          altBuilder: (val) => `Potential ${val}`,
          className: "absolute-center size-[70cqw]",
        })}
      />
    </Card>
  );
}

const TokenNotes = {
  token_10020_ling_soul3a: ["Takes 2 deployment slots"],
  trap_079_allydonq: [
    "Appears in Integrated Strategies Mizuki & Caerula Arbor",
  ],
} as Record<TokenId, string[]>;

type TokenTraitProps = { id: TokenId; trait: string | null };

/** @description Displays the token's trait if it exists. */
function TokenTrait({ id, trait }: TokenTraitProps) {
  const traits = new Array<string>();

  if (TokenNotes[id]) traits.push(...TokenNotes[id]);
  if (!!trait) traits.push(trait);

  if (traits.length === 0) return null;

  return (
    <Card
      as="section"
      defaultPadding
      className={cn(
        "no-scrollbar col-span-2 overflow-y-auto @container md:col-span-1",
        "bg-neutralAlt-10/75 md:aspect-square",
      )}
    >
      <div className="text-[clamp(0.7rem,3cqw,1rem)] lg:text-sm">
        <p
          className={cn(
            "mb-1 text-[1.15em] font-bold text-carrot-60",
            "before:mr-1.5 before:inline-block before:size-[0.4em] before:bg-current",
          )}
        >
          Trait
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: traits.join("\n") }}
          className="whitespace-pre-line"
        />
      </div>
    </Card>
  );
}

/** @description Fetches data for this component. */
function getTokenAnalysisContent(id: TokenId) {
  const token = TokenTable[id];
  const operator = !!token.usedBy ? OperatorTable[token.usedBy] : null;
  return {
    ...pickKeys(token, ["trait", "talents"]),
    statRecipients: [
      {
        ...pickKeys(token, ["id", "range", "stats", "iconId"]),
        href: `/token/${token.slug}`,
        name: token.displayName,
      },
      ...(operator
        ? [
            {
              ...pickKeys(operator, ["id", "range", "stats"]),
              href: `/operator/${operator.slug}`,
              name: operator.displayName,
              iconId: operator.id,
            },
          ]
        : []),
    ] as Recipient[],
    skills: token.skillIds
      .filter((id) => !!id)
      .map((skillId) => SkillTable[skillId!])
      .filter((info, idx, arr) =>
        idx === 0 ? !!info : !!info && info.name !== arr[idx - 1].name,
      ),
  };
}
