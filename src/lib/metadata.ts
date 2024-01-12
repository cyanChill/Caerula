import type { Metadata, ResolvedMetadata } from "next";

interface Props {
  parentMetadata: ResolvedMetadata;
  title: string;
  description: string;
  route: `/${string}`;
}

export function constructMetadata({
  parentMetadata,
  title,
  description,
  route,
}: Props): Metadata {
  return {
    title,
    description,
    openGraph: {
      ...parentMetadata.openGraph,
      title,
      description,
      url: `https://caerula.vercel.app${route}`,
    },
    alternates: {
      canonical: `https://caerula.vercel.app${route}`,
    },
  };
}
