"use client";
import { useState, useRef, useMemo } from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import { cn } from "@/lib/style";
import { clamp } from "@/utils/math";
import ScrollArrow from "../accents/ScrollArrow";

interface SectionMeta {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  /** Glow color for the current section of content. */
  glow: `from-${string}-${number}` | `from-[#${string}]`;
  options?: {
    /** Children that goes under the description in the left column. */
    extraInfo?: React.ReactNode;
    hideArrows?: boolean;
  };
}

interface ScrollSlideProps {
  sections: SectionMeta[];
  options?: { widthLimit?: boolean };
}

const defaultOptions = {
  widthLimit: true,
};

/**
 * @description Displays section heading "fixed/stickied" to the left
 *  side and displays the actual content on the right, with the heading
 *  switching when we scroll into a new section.
 */
export function ScrollSlide({ sections, options }: ScrollSlideProps) {
  const [currSection, setCurrSection] = useState("");

  const internalOptions = useMemo(() => {
    return { ...options, ...defaultOptions };
  }, [options]);
  const { widthLimit } = internalOptions;

  const activeSectionData = sections.find((x) => x.id === currSection);

  return (
    <main className="min-h-[95dvh] grid-cols-[minmax(20rem,1fr)_3.25fr] sm:mx-[max(1.5rem,3cqw)] lg:grid">
      {sections.map((meta) => (
        <SlideSection
          key={meta.id}
          widthLimit={widthLimit}
          activeId={currSection}
          setActiveId={setCurrSection}
          {...meta}
        />
      ))}

      {/* Left Cell border */}
      <div
        className={cn(
          "pointer-events-none sticky top-[5dvh] col-start-1 row-span-full mb-[5dvh] max-h-[90dvh] @container max-lg:hidden",
          // Gradient Border
          "before:border-mask before:absolute before:inset-0 before:z-[1] before:pr-[max(0.0625rem,0.25cqw)]",
          "before:rounded-br-[max(1rem,1cqw)] before:bg-gradient-to-b before:from-white/50 before:to-white/10",
        )}
      >
        <ScrollArrow
          glowRatio="1.25cqw"
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 *:w-[7.5cqw]",
            "transition duration-500",
            { "opacity-0": activeSectionData?.options?.hideArrows },
          )}
        />
      </div>
    </main>
  );
}

interface SlideSectionProps extends SectionMeta {
  widthLimit: boolean;
  activeId: string;
  setActiveId: (id: string) => void;
}

function SlideSection({
  widthLimit,
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
          "col-start-1 row-span-full @container lg:max-h-[90dvh]",
          "grid grid-rows-[auto_minmax(0,1fr)] lg:sticky lg:top-[5dvh]",
          "px-4 pt-[max(2.5rem,15svh)] lg:mb-[5dvh]",
          "transition-opacity duration-500 lg:pointer-events-none lg:opacity-0",
          { "lg:pointer-events-auto lg:opacity-100": activeId === id },
        )}
      >
        <h1
          id={id}
          className={cn(
            "mb-4 font-array text-[clamp(2rem,min(7.5vw,15cqw),15rem)]",
            "font-bold uppercase leading-tight [text-shadow:0_0_3.5em_#9C99FE]",
          )}
        >
          {sectionMeta.title}
        </h1>
        <div className="no-scrollbar lg:overflow-y-auto lg:py-8">
          <p
            className={cn(
              "mb-4 max-w-[85cqw] font-khand text-[clamp(1rem,min(2.5vw,6cqw),5rem)]",
              "[text-shadow:0_0_4em_#FF00D6]",
            )}
          >
            <span className="text-[#99A5B4]">{sectionMeta.description}</span>
          </p>
          {sectionMeta.options?.extraInfo}
        </div>
      </div>

      <section
        ref={sectionRef}
        aria-labelledby={id}
        className="relative col-start-2 px-4 py-[5svh] lg:min-h-dvh lg:py-[10svh]"
      >
        <div
          className={cn("h-full @container", {
            "max-w-screen-2xl": widthLimit,
          })}
        >
          {sectionMeta.content}
        </div>
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
