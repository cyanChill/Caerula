import type { OperatorId } from "@/data/types/AKCharacter";
import OperatorTable from "@/data/operator/operatorTable.json";
import SkillTable from "@/data/character/skillTable.json";
import TokenTable from "@/data/token/tokenTable.json";

import { cn } from "@/lib/style";
import {
  type Recipient,
  ExperienceProvider,
} from "@/features/characters/Experience/store";
import Experience from "@/features/characters/Experience";
import { PotentialProvider } from "@/features/characters/Potentials/store";
import Potentials from "@/features/characters/Potentials";
import Network from "@/features/characters/Network";
import Skills from "@/features/characters/Skills";
import Talents from "@/features/characters/Talents";
import Trait from "@/features/characters/Trait";

type AnalysisTabProps = ReturnType<typeof getAnalysisTabContent>;

/** @description Displays statistical information about the operator. */
export default function AnalysisTab(props: AnalysisTabProps) {
  return (
    <ExperienceProvider recipients={props.statRecipients}>
      <PotentialProvider numPotentials={props.potentials.length}>
        <div
          className={cn(
            "grid grid-flow-dense grid-cols-2 gap-2 py-8 min-[350px]:gap-4 sm:px-4",
            "md:auto-rows-fr md:grid-cols-4 lg:grid-cols-5",
          )}
        >
          <Experience recipients={props.statRecipients} />
          <Talents talents={props.talents} />
          <Skills skills={props.skills} />
          <Potentials potentials={props.potentials} />
          <Trait profession={props.profession} branchId={props.branch} />
          <Network network={props.affiliation} />
        </div>
      </PotentialProvider>
    </ExperienceProvider>
  );
}

/** @description Fetches data for this component. */
export function getAnalysisTabContent(id: OperatorId) {
  const operator = OperatorTable[id];
  return {
    affiliation: operator.affiliation,
    profession: operator.profession,
    branch: operator.branch,
    potentials: operator.potentials,
    talents: operator.talents,
    statRecipients: [
      {
        id: operator.id,
        href: `/operator/${operator.slug}`,
        name: operator.displayName,
        range: operator.range,
        stats: operator.stats,
        bonus: operator.trustBonus,
        iconId: operator.id,
      },
      ...(operator.tokensUsed ?? []).map((tokenId) => {
        const { id, slug, displayName, range, stats, iconId } =
          TokenTable[tokenId];
        return {
          ...{ id, range, stats, iconId },
          href: `/token/${slug}`,
          name: displayName,
        };
      }),
    ] as Recipient[],
    skills: operator.skills.map(({ id, tokenUsed }) => ({
      ...SkillTable[id],
      ...(tokenUsed ? { tokenName: TokenTable[tokenUsed].displayName } : {}),
    })),
  };
}
