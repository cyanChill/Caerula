import { ChevronDown } from "@/assets/svgs/navigation";

import { cn } from "@/lib/style";

interface Props {
  glowRatio?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ScrollArrow({
  glowRatio = "0.25rem",
  style,
  className,
}: Props) {
  return (
    <div
      style={{ "--glowRatio": glowRatio, ...style } as React.CSSProperties}
      className={cn(
        "*:w-8 *:drop-shadow-[0_0_var(--glowRatio)_#95E6FF]",
        className,
        "flex flex-col",
      )}
    >
      <ChevronDown compressed className="animate-[slide-in-out_4s_infinite]" />
      <ChevronDown
        compressed
        className="animate-[slide-in-out_4s_infinite] [animation-delay:-0.4s]"
      />
      <ChevronDown
        compressed
        className="animate-[slide-in-out_4s_infinite] [animation-delay:-0.8s]"
      />
    </div>
  );
}
