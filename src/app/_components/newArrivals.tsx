import Image from "next/image";

import { ArrowTopRight } from "@/assets/svgs/direction";
import type { Skin } from "@/data/types/AKSkin";

import { cn } from "@/lib/style";
import ELink from "@/components/link/ELink";
import Card from "@/components/ui/Card";
import ArtistChips from "@/features/skins/ArtistChips";

interface Props {
  skins: (Pick<Skin, "id" | "name" | "imgAlt" | "description" | "artists"> & {
    opName: string;
    slug: string;
  })[];
}

export default function NewArrivals({ skins }: Props) {
  return (
    <div className="grid gap-2 [--min-col-size:32rem] @sm:grid-cols-2 lg:grid-cols-autoFill lg:gap-4">
      {skins.map(({ id, name, imgAlt, description, artists, opName, slug }) => (
        <article key={id} className="mx-auto w-full @container">
          <Card className="grid bg-neutralAlt-10/75 @lg:grid-cols-[1fr_1.5fr]">
            <Image
              src={`/images/character/skin/${encodeURIComponent(id)}b.webp`}
              alt={imgAlt}
              width={512}
              height={512}
              className="aspect-square w-full rounded-2xl bg-neutral-20/50 object-contain"
            />

            <div className="flex min-w-0 text-[clamp(0.75rem,5cqw,2.75rem)] @lg:flex-col">
              <div className="flex min-w-0 flex-1 flex-col justify-center px-[max(0.5rem,0.75em)] py-0.5 @lg:px-[0.5em]">
                <h2 className="line-clamp-1 @lg:mt-[0.5em]">{name}</h2>
                <div className="flex gap-1.5 text-[0.9em] @lg:text-[0.4em]">
                  <p
                    className={cn(
                      "@lg:flex-center rounded-md @lg:shrink-0 @lg:px-[0.5em]",
                      "line-clamp-1 font-geist-sans text-neutral-80 @lg:bg-neutral-20",
                    )}
                  >
                    {opName}
                  </p>
                  <ArtistChips
                    artists={artists}
                    className="hidden truncate @lg:inline-flex"
                  />
                </div>
                <p className="mt-auto hidden text-[0.4em] text-neutral-80 @lg:line-clamp-5">
                  {description}
                </p>
              </div>

              <ELink
                aria-label={`View more of ${opName}'s outfits.`}
                href={`/operator/${slug}`}
                className={cn(
                  "ml-auto size-[3.5em] rounded-2xl p-2 @lg:size-[2em]",
                  "bg-tertiary-50 transition duration-500 hover:bg-tertiary-30",
                )}
              >
                <ArrowTopRight thin />
              </ELink>
            </div>
          </Card>
        </article>
      ))}
    </div>
  );
}
