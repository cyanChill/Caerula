"use client";
import { useState, useRef } from "react";
import Image from "next/image";

import { ArrowTopRight } from "@/assets/svgs/direction";
import { Pinwheel } from "@/assets/svgs/shapes";

import type { Operator } from "@/data/types/AKCharacter";
import { ProfessionMap } from "@/data/operator/classes";
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

  useTabListEvents(tabListRef, setIdx, { tabCount: operators.length });

  const currOperator = operators[currIdx];

  return (
    <>
      <div
        id={`op-tp-${currOperator.id}`}
        role="tabpanel"
        aria-labelledby={`op-tt-${currOperator.id}`}
        className={cn(
          "grid max-w-screen-2xl grid-cols-[minmax(0,1fr)_auto] gap-4 @sm:grid-cols-[auto_auto_minmax(0,1fr)]",
          "text-[clamp(0.75rem,1.25cqw,1.75rem)]",
        )}
      >
        <div className="drop-shadow-xl @lg:w-60">
          <PsychedelicImg
            src={`/operator/portrait/${currOperator.id}_${
              currOperator.rarity > 3 ? 2 : 1
            }.webp`}
            width={180}
            height={360}
            classNames={{ wrapper: "h-full", image: "object-cover" }}
          />
        </div>

        <div className="flex w-[clamp(4rem,25cqw,6rem)] flex-col gap-4">
          <div
            className={cn(
              "flex flex-1 flex-col items-center justify-evenly gap-2 p-[0.75em]",
              "rounded-2xl drop-shadow-xl backdrop-blur-xl",
              "bg-gradient-to-b from-[#1E1B4B] to-[#0a091b] to-75%",
            )}
          >
            <Image
              src={`/operator/class/${ProfessionMap[
                currOperator.profession
              ].toLowerCase()}.webp`}
              alt=""
              width={96}
              height={96}
            />
            <Image
              src={`/operator/subclass/sub_${currOperator.branch}_icon.webp`}
              alt=""
              width={96}
              height={96}
            />
          </div>

          <ELink
            aria-label={`Go to ${currOperator.name}'s page.`}
            href={`/operator/${currOperator.slug}`}
            className={cn(
              "flex-center aspect-square rounded-2xl p-[0.75em] backdrop-blur-xl",
              "bg-gradient-to-tr from-[#355E3B]/50 to-[#87A96B]/50 drop-shadow-xl",
              "hover:brightness-125",
            )}
          >
            <ArrowTopRight thin />
          </ELink>
        </div>

        <div
          className={cn(
            "col-span-full row-start-2 px-[1.5em] py-[1em] @container @2xl:w-3/4",
            "flex flex-col gap-2 rounded-2xl drop-shadow-xl backdrop-blur-xl",
            "bg-gradient-to-b from-dust-165 from-10% to-dust-100/50",
          )}
        >
          <p className="inline-flex h-[1.25em] items-center gap-1 self-end font-semibold text-[#CF9FFF]">
            {currOperator.type === "limited" && (
              <>
                <Pinwheel className="size-full" /> Limited
              </>
            )}
          </p>
          <p className="inline-flex min-h-[2lh] items-end font-array text-[clamp(1.5rem,7cqw,3rem)] font-bold uppercase leading-none tracking-wider">
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
            "col-span-full row-start-3 rounded-2xl p-[1em] @xl:col-start-3 @xl:row-start-1",
            "border border-dust-150/75 bg-dust-150/75 drop-shadow-xl backdrop-blur-xl",
          )}
        >
          <p className="line-clamp-6 @xl:line-clamp-none">
            {currOperator.description}
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl">
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
                  "aspect-[8/1] h-1.5 rounded-full bg-dust-85",
                  "transition-[flex,background_color] duration-500",
                  { "flex-1 bg-white": selected },
                )}
              ></button>
            );
          })}
        </div>
      </div>
    </>
  );
}
