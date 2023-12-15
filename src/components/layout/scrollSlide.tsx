"use client";
import { useState, useEffect, useRef } from "react";

import { cn, clamp } from "@/lib/util";

interface SectionMeta {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

interface ScrollSlideProps {
  sections: SectionMeta[];
}

export function ScrollSlide({ sections }: ScrollSlideProps) {
  const [currSection, setCurrSection] = useState("");

  return (
    <main className="grid grid-cols-3 sm:ml-[max(1.5rem,3cqw)] sm:mr-[max(0.5rem,1cqw)] md:grid-cols-5 lg:grid-cols-11">
      {sections.map((meta) => (
        <SlideSection
          key={meta.id}
          activeId={currSection}
          setActiveId={setCurrSection}
          {...meta}
        />
      ))}
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
  const textRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(activeId === id);

  useEffect(() => {
    if (!textRef.current) return;

    const _threshold = window.innerHeight / textRef.current.clientHeight;
    const screenThreshold = clamp(0, _threshold - 0.1, 1);

    const observer = new IntersectionObserver(
      (entry) => {
        // If viewport is covered by content or content is most of viewport on init
        if (entry[0].isIntersecting || entry[0].intersectionRatio > 0.5) {
          setSeen(true);
          setActiveId(id);
        }
      },
      { root: null, rootMargin: "0px", threshold: screenThreshold },
    );
    observer.observe(textRef.current);

    return () => {
      observer.disconnect();
    };
  }, [id, setActiveId]);

  return (
    <>
      <div
        ref={textRef}
        className={cn(
          "col-span-full px-[max(0.5rem,1cqw)] py-[max(2.5rem,15svh)] max-lg:pb-0 lg:col-span-4 lg:min-h-[100svh]",
          "border-white/5 @container lg:border-r-[max(0.125rem,0.15cqw)]",
        )}
      >
        <h1
          id={id}
          className={cn(
            "mb-4 transition-opacity duration-500 ease-in-out lg:opacity-25",
            "font-array text-cq-title font-bold uppercase",
            { "lg:opacity-100": seen },
          )}
        >
          {sectionMeta.title}
        </h1>

        <p
          className={cn(
            "max-w-[85cqw] transition-visibility duration-500 ease-in-out lg:invisible lg:opacity-0",
            "font-khand text-cq-paragraph",
            { "lg:visible lg:opacity-100": seen },
          )}
        >
          <span className="text-caerula-40">{sectionMeta.description}</span>
        </p>
      </div>

      <section
        aria-labelledby={id}
        className={cn(
          "col-span-full lg:col-span-7 lg:col-start-5 lg:row-span-full",
          "mx-[max(0.5rem,1cqw)] my-[5svh] lg:sticky lg:top-[5svh] lg:max-h-[90svh]",
          "transition-visibility duration-500 ease-in-out lg:invisible lg:opacity-0",
          { "lg:visible lg:opacity-100": activeId === id },
        )}
      >
        {sectionMeta.content}
      </section>
    </>
  );
}

interface CBWProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ContentBorderWrapper({ children, className, style }: CBWProps) {
  return (
    <div
      style={style}
      className={cn(
        "relative h-full px-[max(0.5rem,1cqw)] pt-[max(0.125rem,0.15cqw)]",
        // Gradient Border
        "before:border-mask before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:p-[max(0.125rem,0.15cqw)] before:pb-0",
        "before:rounded-[max(0.5rem,1cqw)] before:bg-gradient-to-b before:from-white/50 before:to-white/10",
        // Blur transition on overflow child content
        "lg:after:absolute lg:after:bottom-0 lg:after:left-[max(0.5rem,1cqw)] lg:after:h-[1ch] lg:after:w-[calc(100%-2cqw)]",
        "lg:after:bg-gradient-to-t lg:after:from-caerula-180 lg:after:from-15% lg:after:backdrop-blur-lg",
      )}
    >
      <div
        className={cn(
          "no-scrollbar h-full px-1 py-[max(0.5rem,1cqw)] lg:overflow-y-auto",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
