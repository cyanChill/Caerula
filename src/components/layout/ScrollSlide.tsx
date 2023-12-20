"use client";
import { useState, useRef } from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import { cn } from "@/lib/style";
import { clamp } from "@/utils/math";
import ScrollArrow from "../accents/ScrollArrow";

interface SectionMeta {
  id: string;
  title: string;
  description: string;
  /** Children that goes under the description in the left column. */
  extraInfo?: React.ReactNode;
  content: React.ReactNode;
  /** Glow color for the current section of content. */
  glow: `from-${string}-${number}` | `from-[#${string}]`;
}

interface ScrollSlideProps {
  sections: SectionMeta[];
}

export function ScrollSlide({ sections }: ScrollSlideProps) {
  const [currSection, setCurrSection] = useState("");

  return (
    <main className="sm:mx-[max(1.5rem,3cqw)] lg:grid lg:grid-cols-10 lg:gap-5 xl:grid-cols-12">
      {sections.map((meta) => (
        <SlideSection
          key={meta.id}
          activeId={currSection}
          setActiveId={setCurrSection}
          {...meta}
        />
      ))}

      {/* Left Cell border */}
      <div
        className={cn(
          "pointer-events-none sticky top-[5svh] col-span-3 col-start-1 row-span-full mb-[5svh] max-h-[90svh] @container max-lg:hidden",
          // Gradient Border
          "before:border-mask before:absolute before:inset-0 before:z-[1] before:pr-[max(0.0625rem,0.25cqw)]",
          "before:rounded-br-[max(1rem,1cqw)] before:bg-gradient-to-b before:from-white/50 before:to-white/10",
        )}
      >
        <ScrollArrow
          glowRatio="1.25cqw"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 *:w-[7.5cqw]"
        />
      </div>
    </main>
  );
}

interface SlideSectionProps extends SectionMeta {
  activeId: string;
  setActiveId: (id: string) => void;
}

function SlideSection({
  activeId,
  setActiveId,
  id,
  ...sectionMeta
}: SlideSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const _threshold = sectionRef.current
    ? window.innerHeight / sectionRef.current.clientHeight
    : 1;
  const screenThreshold = clamp(0, _threshold - 0.05, 1);

  useIntersectionObserver(
    sectionRef,
    (entry) => {
      // If viewport is covered by content or content is most of viewport on init
      if (entry[0].isIntersecting || entry[0].intersectionRatio > 0.5) {
        setActiveId(id);
      }
    },
    { root: null, rootMargin: "0px", threshold: screenThreshold },
  );

  return (
    <>
      <div
        className={cn(
          "col-span-3 col-start-1 row-span-full @container lg:sticky lg:top-[5svh] lg:mb-[5svh] lg:max-h-[90svh]",
          "px-[max(1rem,1cqw)] py-[max(2.5rem,15svh)] max-lg:pb-0",
          "transition-opacity duration-500 ease-in-out lg:pointer-events-none lg:opacity-0",
          { "lg:pointer-events-auto lg:opacity-100": activeId === id },
        )}
      >
        <h1
          id={id}
          className={cn(
            "mb-4 font-array text-cq-title font-bold uppercase",
            "[text-shadow:0_0_3.5em_#9C99FE]",
          )}
        >
          {sectionMeta.title}
        </h1>
        <p
          className={cn(
            "mb-4 max-w-[85cqw] font-khand text-cq-paragraph",
            "[text-shadow:0_0_4em_#FF00D6]",
          )}
        >
          <span className="text-caerula-40">{sectionMeta.description}</span>
        </p>
        {sectionMeta.extraInfo}
      </div>

      <section
        ref={sectionRef}
        aria-labelledby={id}
        className={cn(
          "relative col-span-9 col-start-4 @container lg:min-h-svh",
          "px-[max(1rem,1cqw)] py-[5svh] lg:py-[10svh]",
        )}
      >
        {sectionMeta.content}
        <div
          className={cn(
            "absolute left-1/2 top-0 -z-[1] size-full -translate-x-1/2 bg-gradient-radial to-60% opacity-25",
            sectionMeta.glow,
          )}
        />
      </section>
    </>
  );
}
