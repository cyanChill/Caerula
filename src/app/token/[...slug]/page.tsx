import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import TokenTable from "@/data/token/tokenTable.json";
import { TokSlugTable } from "@/data/token/slugTable";

import { constructMetadata } from "@/lib/metadata";
import { JotaiProvider } from "@/lib/jotai";
import TokenAnalysis, { getTokenAnalysisContent } from "./_components/analysis";

interface Props {
  params: { slug: string[] };
}

/** @description Statically generate routes instead of on-demand at request time. */
export function generateStaticParams() {
  return Object.values(TokenTable).map((token) => ({
    slug: [...token.slug.split("/")],
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug.join("/"));
  const tokId = TokSlugTable[slug];

  if (!tokId) {
    return {
      title: { absolute: "Token Not Found!" },
      description: "Token not found.",
    };
  }

  const token = TokenTable[tokId];

  return constructMetadata({
    parentMetadata: await parent,
    title: token.displayName,
    description: `Information about ${token.displayName}.`,
    route: `/token/${token.slug}`,
  });
}

export default function Token({ params }: Props) {
  const slug = decodeURIComponent(params.slug.join("/"));
  const tokId = TokSlugTable[slug];
  if (!tokId) notFound();

  return (
    <main className="mx-auto mb-[5svh] min-h-[90dvh] max-w-screen-2xl p-2 @container">
      <JotaiProvider>
        <TokenAnalysis {...getTokenAnalysisContent(tokId)} />
      </JotaiProvider>
    </main>
  );
}
