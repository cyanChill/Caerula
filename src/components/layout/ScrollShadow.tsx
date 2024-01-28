import { cn } from "@/lib/style";

interface Props {
  color: `#${string}`;
  isVertical?: boolean;
  children: React.ReactNode;
}

/**
 * @description Applies a gradient the smooth the transition of the
 *  content scrolling out of the container.
 */
export default function ScrollShadow({ color, isVertical, children }: Props) {
  return (
    <div
      style={
        {
          "--gradient-1": `to ${isVertical ? "bottom" : "right"}, ${color}, ${color}00`,
          "--gradient-2": `to ${isVertical ? "top" : "left"}, ${color}, ${color}00`,
        } as React.CSSProperties
      }
      className={cn(
        "relative before:pointer-events-none after:pointer-events-none",
        "before:absolute before:left-0 before:top-0 before:z-[1] before:h-full before:w-8 lg:before:w-16",
        "before:bg-[linear-gradient(var(--gradient-1))]",
        "after:absolute after:bottom-0 after:right-0 after:z-[1] after:h-full after:w-8 lg:after:w-16",
        "after:bg-[linear-gradient(var(--gradient-2))]",
        {
          "before:h-8 before:w-full lg:before:h-16": isVertical,
          "after:h-8 after:w-full lg:after:h-16": isVertical,
        },
      )}
    >
      {children}
    </div>
  );
}
