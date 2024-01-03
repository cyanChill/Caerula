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
    <>
      <div
        id={`op-tp-${currOperator.id}`}
        role="tabpanel"
        aria-labelledby={`op-tt-${currOperator.id}`}
        className="grid gap-4 @xs:grid-cols-[auto_minmax(0,1fr)]"
      >
        <div
          className={cn(
            "mr-auto flex rounded-2xl drop-shadow-xl backdrop-blur-xl",
            "bg-gradient-to-b from-[#100f24] to-[#0a091b] to-80%",
          )}
        >
          <PsychedelicImg
            src={`/operator/portrait/${currOperator.id}_${
              currOperator.rarity > 3 ? 2 : 1
            }.webp`}
            width={180}
            height={360}
            classNames={{ wrapper: "h-full @lg:w-60", image: "object-cover" }}
          />

          <div className="flex w-[clamp(2rem,25cqw,4.5rem)] flex-col justify-evenly gap-2">
            <Image
              src={`/operator/class/${currOperator.profession.toLowerCase()}.webp`}
              alt=""
              width={96}
              height={96}
              className="mt-2 p-1 @xs:p-2"
            />
            <Image
              src={`/operator/subclass/sub_${currOperator.branch}_icon.webp`}
              alt=""
              width={96}
              height={96}
              className="mb-auto p-1 @xs:p-2"
            />
            <ELink
              aria-label={`Go to ${currOperator.name}'s page.`}
              href={`/operator/${currOperator.slug}`}
              className={cn(
                "flex-center aspect-square rounded-2xl p-1 backdrop-blur-xl @xs:p-2",
                "bg-gradient-to-tr from-[#355E3B]/50 to-[#87A96B]/50 hover:brightness-125",
              )}
            >
              <ArrowTopRight thin />
            </ELink>
          </div>
        </div>

        <div
          className={cn(
            "col-span-full row-start-2 p-4 @container @xs:px-6 @2xl:w-3/4",
            "flex flex-col gap-2 rounded-2xl drop-shadow-xl backdrop-blur-xl",
            "bg-gradient-to-b from-[#0E0E0C] from-10% to-[#262626]/50",
          )}
        >
          <p className="inline-flex h-5 items-center gap-1 self-end font-semibold text-[#CF9FFF]">
            {currOperator.type === "limited" && (
              <>
                <Pinwheel className="size-full" /> Limited
              </>
            )}
          </p>
          <p
            className={cn(
              "inline-flex min-h-[2lh] items-end text-[clamp(1.5rem,7cqw,3rem)]",
              "font-array font-bold uppercase leading-none tracking-wider",
            )}
          >
            {currOperator.name}
          </p>
          <Rarity
            rarity={currOperator.rarity}
            size="size-[clamp(0.8rem,5cqw,1.25rem)]"
          />
        </div>

        {/* When the container passes a certain width, have it move to a new row */}
        <div
          className={cn(
            "col-span-full row-start-3 p-[1em] @xl:col-start-2 @xl:row-start-1",
            "rounded-2xl text-[clamp(0.8rem,1.25cqw,1.75rem)] drop-shadow-xl backdrop-blur-xl",
            "border border-[#131313]/75 bg-[#131313]/75",
          )}
        >
          <p className="line-clamp-6 whitespace-pre-line @xl:line-clamp-none">
            {currOperator.description}
          </p>
        </div>
      </div>

      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Latest Operator Gallery"
        aria-orientation="horizontal"
        className="flex-center mx-auto my-4 max-w-96 gap-2"
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
                "aspect-[8/1] h-1.5 rounded-full bg-[#4D4D4D]",
                "transition-[flex,background_color] duration-500",
                { "flex-1 bg-white": selected },
              )}
            ></button>
          );
        })}
      </div>
    </>
  );
}
