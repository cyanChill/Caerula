import { cn } from "@/lib/style";

interface Props {
  color: `#${string}`;
  isVertical?: boolean;
  /** ie: `[--blurSize:2rem] lg:[--blurSize:4rem]` */
  blurSize?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * @description Applies a gradient the smooth the transition of the
 *  content scrolling out of the container.
 */
export default function ScrollShadow({
  color,
  isVertical = false,
  blurSize = "[--blurSize:2rem] lg:[--blurSize:4rem]",
  className,
  children,
}: Props) {
  return (
    <div
      style={
        {
          "--shdwGrad":
            `to ${isVertical ? "bottom" : "right"},` +
            `${color} 0%, ${color}00 var(--blurSize),` +
            `${color}00 calc(100% - var(--blurSize)), ${color} 100%`,
        } as React.CSSProperties
      }
      className={cn(
        "relative before:pointer-events-none before:z-[1] before:size-full",
        "before:absolute before:left-0 before:top-0 before:bg-[linear-gradient(var(--shdwGrad))]",
        blurSize,
        className,
      )}
    >
      {children}
    </div>
  );
}
