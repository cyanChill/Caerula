import type { Operator } from "@/data/types/AKCharacter";

import { cn } from "@/lib/style";
import {
  type Recipient,
  ExperienceProvider,
} from "@/features/characters/Experience/store";
import Experience from "@/features/characters/Experience";
import { PotentialProvider } from "@/features/characters/Potentials/store";
import Potentials from "@/features/characters/Potentials";
import Network from "@/features/characters/Network";
import Skills, { type CharSkill } from "@/features/characters/Skills";
import Talents from "@/features/characters/Talents";
import Trait from "@/features/characters/Trait";

interface AnalysisTabProps
  extends Pick<
    Operator,
    "affiliation" | "branch" | "potentials" | "profession" | "talents"
  > {
  skills: CharSkill[];
  statRecipients: Recipient[];
}

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
