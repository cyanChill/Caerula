import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import OperatorTable from "@/data/operator/operatorTable.json";
import ProfileTable from "@/data/operator/profile/profileTable.json";
import SkillTable from "@/data/gameplay/skillTable.json";
import SkinTable from "@/data/operator/skinTable.json";
import TokenTable from "@/data/token/tokenTable.json";
import { OpSlugTable } from "@/data/operator/slugTable";
import VoiceTable from "@/data/operator/profile/voiceTable.json";

import { cn } from "@/lib/style";
import { constructMetadata } from "@/lib/metadata";
import Overview from "./_components/overview";

import {
  type Recipient,
  ExperienceProvider,
} from "@/features/characters/Experience.store";
import Experience from "@/features/characters/Experience";
import Talent from "@/features/characters/Talent";
import Skills from "@/features/characters/Skills";
import Potentials, {
  PotentialProvider,
} from "@/features/characters/Potentials";
import Trait from "@/features/characters/Trait";
import Network from "@/features/characters/Network";

interface Props {
  params: { slug: string[] };
}

/** @description Statically generate routes instead of on-demand at request time. */
export function generateStaticParams() {
  return Object.values(OperatorTable).map((operator) => ({
    slug: [...operator.slug.split("/")],
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug.join("/"));
  const opId = OpSlugTable[slug];

  if (!opId) {
    return {
      title: { absolute: "Operator Not Found!" },
      description: "Operator not found.",
    };
  }

  const operator = OperatorTable[opId];

  return constructMetadata({
    parentMetadata: await parent,
    title: operator.displayName,
    description:
      ProfileTable.fileTable[opId]?.find(({ title }) => title === "Profile")
        ?.text ?? "",
    route: `/operator/${operator.slug}`,
  });
}

export default function Operator({ params }: Props) {
  const slug = decodeURIComponent(params.slug.join("/"));
  const opId = OpSlugTable[slug];
  if (!opId) notFound();

  const operator = OperatorTable[opId];
  const skins = SkinTable.opSkinMap[opId].map(
    (skinId) => SkinTable.skinTable[skinId],
  );
  const voices = Object.fromEntries(
    VoiceTable.opVoiceMap[opId].map((cvId) => [cvId, VoiceTable.cvTable[cvId]]),
  );

  const statRecipients: Recipient[] = [
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
  ];

  const skills = operator.skills.map(({ id, tokenUsed }) => ({
    ...SkillTable[id],
    ...(tokenUsed ? { tokenName: TokenTable[tokenUsed].displayName } : {}),
  }));

  return (
    <main className="mx-auto mb-[5svh] max-w-screen-2xl p-2 @container">
      <Overview
        id={operator.id}
        operator={{
          name: operator.displayName,
          position: operator.position,
          tags: operator.tags,
          rarity: operator.rarity,
        }}
        skins={skins}
        cvTable={voices}
      />
      <ExperienceProvider recipients={statRecipients}>
        <PotentialProvider numPotentials={operator.potentials.length}>
          <div
            className={cn(
              "grid grid-flow-dense grid-cols-2 gap-2 py-8 min-[350px]:gap-4 sm:px-4",
              "md:auto-rows-fr md:grid-cols-4 lg:grid-cols-5",
            )}
          >
            <Experience />
            <Talent talents={operator.talents} />
            <Skills skills={skills} />
            <Potentials potentials={operator.potentials} />
            <Trait
              profession={operator.profession}
              branchId={operator.branch}
            />
            <Network network={operator.affiliation} />
          </div>
        </PotentialProvider>
      </ExperienceProvider>
    </main>
  );
}
