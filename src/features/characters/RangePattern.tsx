import type { RangeId } from "@/data/types/AKRange";
import RangeTable from "@/data/gameplay/rangeTable.json";

import { cn } from "@/lib/style";

interface Props {
  rangeId: RangeId;
  /** Size of squares; recommended to use `size-[clamp()]` */
  size: `size-${number}` | `size-[${string}]`;
  className?: string;
}

/** @description Visual representation of a range from its id. */
export default function RangePattern({ rangeId, size, className }: Props) {
  const rangeArea = RangeTable[rangeId];
  if (!rangeArea) return null;

  return (
    <div
      role="img"
      aria-label="Range Pattern"
      style={
        {
          "--numCols": rangeArea[0].length,
          "--numRows": rangeArea.length,
        } as React.CSSProperties
      }
      className={cn(
        "grid w-fit grid-cols-[repeat(var(--numCols),1fr)] gap-0.5",
        "grid-rows-[repeat(var(--numRows),1fr)]",
        className,
      )}
    >
      {rangeArea.flat().map((val, idx) => (
        <span
          key={idx}
          role="presentation"
          className={cn(size, "rounded border border-transparent", {
            "border-neutral-80": val === 1,
            "border-carrot-60 bg-carrot-60": val === 2,
          })}
        />
      ))}
    </div>
  );
}
