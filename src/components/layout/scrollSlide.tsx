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
    <main className="grid grid-cols-3 sm:mx-5 md:grid-cols-5 lg:grid-cols-10">
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
          "col-span-full px-5 py-[max(2.5rem,15svh)] max-lg:pb-0 lg:col-span-3 lg:min-h-[100svh]",
          "border-white/5 @container lg:border-r-2",
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
          "col-span-full lg:col-span-7 lg:col-start-4 lg:row-span-full",
          "mx-5 my-[5svh] lg:sticky lg:top-[5svh] lg:max-h-[90svh]",
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
        "relative h-full p-5 pb-0 lg:overflow-y-auto [&>*:last-child]:pb-5",
        // Gradient Border
        "before:border-mask before:absolute before:inset-0 before:-z-[1] before:p-0.5 before:pb-0",
        "before:rounded-2xl before:bg-gradient-to-b before:from-white/50 before:to-white/10",
        // Blur transition on overflow-hidden content
        "after:absolute after:bottom-0 after:left-5 after:h-[1ch] after:w-[calc(100%-2.5rem)]",
        "after:bg-gradient-to-t after:from-caerula-180 after:from-15% after:backdrop-blur-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
