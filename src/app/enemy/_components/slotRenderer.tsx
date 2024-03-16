"use client";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/style";
import ModalBackdrop from "@/components/layout/ModalBackdrop";

/**
 * @description Handles rendering of children in the slot next to the
 *  filter list on desktop & give it a modal-look on mobile.
 */
export function SlotRenderer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // See if we're rendering an enemy (or error page)
  const isRenderingEnemy = pathname.startsWith("/enemy/");

  return (
    <div
      style={{ "--border-color": "#909094" } as React.CSSProperties}
      className={cn(
        "grid",
        // Mobile Layout (Full-Page Modal)
        "fixed left-0 top-0 z-[1] h-dvh",
        // Desktop Layout
        "lg:dashed-border lg:!sticky lg:top-[5dvh] lg:h-auto lg:max-h-[90dvh]",
      )}
    >
      {isRenderingEnemy && (
        <>
          <div className="no-scrollbar grid overflow-y-scroll p-4">
            {children}
          </div>
          <ModalBackdrop
            isVisible={isRenderingEnemy}
            className="z-[-1] lg:pointer-events-none lg:opacity-0"
          />
        </>
      )}
    </div>
  );
}
