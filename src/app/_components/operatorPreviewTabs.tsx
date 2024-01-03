"use client";
import { useState, useRef } from "react";
import Image from "next/image";

import { ArrowTopRight } from "@/assets/svgs/direction";
import { Pinwheel } from "@/assets/svgs/shapes";

import type { Operator } from "@/data/types/AKCharacter";
import { useInterval } from "@/hooks/useInterval";
import { useTabListEvents } from "@/hooks/useTabListEvents";

import { cn } from "@/lib/style";
import PsychedelicImg from "@/components/image/PsychedelicImg";
import ELink from "@/components/link/ELink";
import Rarity from "@/components/accents/Rarity";
import Chip from "@/components/ui/Chip";

interface Props {
  operators: (Pick<
    Operator,
    "id" | "slug" | "name" | "rarity" | "type" | "profession" | "branch"
  > & { description: string })[];
}

export default function OperatorPreviewTabs({ operators }: Props) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const [currIdx, setIdx] = useState(0);

  // Run interval once a minute
  useInterval(
    () => setIdx((prev) => (prev + 1 + operators.length) % operators.length),
    60000,
    { resetDependency: currIdx },
  );
  useTabListEvents(tabListRef, setIdx, { tabCount: operators.length });

  const currOperator = operators[currIdx];

  return (
    <div className="grid">
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Latest Operator Carousel"
        aria-orientation="horizontal"
        className="flex-center row-start-2 mx-auto my-4 w-full max-w-96 gap-2"
      >
        {operators.map((op, idx) => {
          const selected = idx === currIdx;
          return (
            <button
              key={op.id}
              id={`op-tt-${op.id}`}
              type="button"
              role="tab"
              aria-label={op.name}
              aria-selected={selected}
              aria-controls={`op-tp-${op.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIdx(idx)}
              className={cn(
                "h-1.5 w-8 rounded-full bg-[#4D4D4D]",
                "transition-[flex,background_color] duration-700",
                { "flex-1 bg-white": selected },
              )}
            ></button>
          );
        })}
      </div>

      <div
        id={`op-tp-${currOperator.id}`}
        role="tabpanel"
        aria-labelledby={`op-tt-${currOperator.id}`}
        className="grid gap-4 @[40rem]:grid-cols-[auto_minmax(0,1fr)]"
      >
        <div className="bg-secondary-10 mr-auto flex rounded-2xl drop-shadow-xl">
          <PsychedelicImg
            src={`/operator/portrait/${currOperator.id}_${
              currOperator.rarity > 3 ? 2 : 1
            }.webp`}
            width={180}
            height={360}
            classNames={{ wrapper: "h-full @lg:w-56", image: "object-cover" }}
          />

          <div className="flex w-[clamp(2rem,25cqw,4.5rem)] flex-col justify-evenly gap-2">
            <Image
              src={`/operator/class/${currOperator.profession.toLowerCase()}.webp`}
              alt=""
              width={96}
              height={96}
              className="mt-2 p-1 @[40rem]:p-2"
            />
            <Image
              src={`/operator/subclass/sub_${currOperator.branch}_icon.webp`}
              alt=""
              width={96}
              height={96}
              className="mb-auto p-1 @[40rem]:p-2"
            />
            <ELink
              aria-label={`Go to ${currOperator.name}'s page.`}
              href={`/operator/${currOperator.slug}`}
              className={cn(
                "flex-center aspect-square rounded-2xl p-1 backdrop-blur-xl @[40rem]:p-2",
                "scale-[85%] bg-[#EB6A28] transition duration-500 hover:scale-100 hover:bg-[#FF8C57] focus:scale-100",
              )}
            >
              <ArrowTopRight thin />
            </ELink>
          </div>
        </div>

        <div className="drop-shadow-xl @container @[40rem]:row-span-2 @[40rem]:mt-48">
          <div className="bg-neutral-20/50 rounded-2xl p-4 backdrop-blur-2xl @[40rem]:px-6">
            <p className="mb-2 font-array text-[clamp(1.5rem,7cqw,4rem)] font-bold leading-none tracking-wider">
              {currOperator.name}
            </p>
            <div className="flex flex-wrap gap-2 text-[clamp(0.75rem,2cqw,1rem)] ">
              <Rarity
                rarity={currOperator.rarity}
                size="size-[1em]"
                className="bg-neutral-20 gap-[0.25em] rounded-md px-[0.5em] py-1"
              />
              <OperatorTypeChip type={currOperator.type} />
            </div>
          </div>
          <div className="bg-neutral-10/75 rounded-2xl p-4 backdrop-blur-2xl">
            <p className="line-clamp-6 whitespace-pre-line text-[clamp(0.8rem,1.75cqw,1.5rem)] @[40rem]:line-clamp-none">
              {currOperator.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OperatorTypeChip({ type }: { type: Operator["type"] }) {
  if (type !== "limited") return null;
  return (
    <Chip
      variant="bordered"
      color="tertiary"
      radius="medium"
      icon={<Pinwheel className="size-[1em]" />}
    >
      Limited
    </Chip>
  );
}
