import type { Metadata, ResolvingMetadata } from "next";

import TerminologyTable from "@/data/gameplay/terminology.json";

import { constructMetadata } from "@/lib/metadata";
import Card from "@/components/ui/Card";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return constructMetadata({
    parentMetadata: await parent,
    title: "Terminology",
    description: "Explanations of terms utilized in-game.",
    route: "/terminology",
  });
}

export default function Terminology() {
  return (
    <main className="mx-auto mb-[5svh] max-w-screen-2xl p-2 sm:px-8">
      <h1 className="mb-8 mt-[15svh] text-4xl font-semibold sm:mt-[25svh] sm:text-5xl md:text-7xl">
        Terminology
      </h1>
      <p className="font-geist-sans text-sm text-neutral-70 sm:text-base md:text-xl">
        Categorized terms with their explanation used in Arknights.
      </p>

      <div className="mt-20 gap-4 *:mb-4 *:break-inside-avoid-column md:columns-2">
        {Object.entries(TerminologyTable).map(
          ([key, { name, description, terms }]) => (
            <Card
              key={key}
              as="section"
              aria-labelledby={key}
              defaultPadding
              className="bg-neutral-10/75"
            >
              <h2 id={key} className="mb-1 text-2xl font-semibold sm:text-3xl">
                {name}
              </h2>
              <p className="mb-4 font-geist-sans text-neutral-70">
                {description}
              </p>

              <ul className="space-y-2">
                {Object.values(terms).map(({ name, description, slug }) => (
                  <li key={slug} id={slug} className="scroll-mt-4">
                    <p className="font-semibold sm:text-lg">{name}</p>
                    <p className="text-sm text-neutral-70 sm:text-base">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          ),
        )}
      </div>
    </main>
  );
}
