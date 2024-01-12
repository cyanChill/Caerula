import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import OperatorTable from "@/data/operator/operatorTable.json";
import ProfileTable from "@/data/operator/profile/profileTable.json";
import SkinTable from "@/data/operator/skinTable.json";
import { OpSlugTable } from "@/data/operator/slugTable";
import VoiceTable from "@/data/operator/profile/voiceTable.json";

import { constructMetadata } from "@/lib/metadata";
import Overview, { OverviewProvider } from "./_components/overview";

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

  return (
    <main className="mx-auto mb-[5svh] max-w-screen-2xl p-2 @container/main">
      <OverviewProvider id={opId} skins={skins} cvTable={voices}>
        <Overview name={operator.displayName} />
      </OverviewProvider>
    </main>
  );
}
