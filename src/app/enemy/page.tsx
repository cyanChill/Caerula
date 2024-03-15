import type { Metadata, ResolvingMetadata } from "next";

import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return constructMetadata({
    parentMetadata: await parent,
    title: "Enemies",
    description: "View all the enemies available on Global.",
    route: "/enemy",
  });
}

export default function Enemies() {
  return null;
}
