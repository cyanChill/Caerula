import type { RangeId } from "@/data/types/AKRange";
import RangeTable from "@/data/character/rangeTable.json";

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

type ContainedRangeProps =
  | { rangeId: RangeId; optional?: false }
  | { rangeId: RangeId | null; optional: true };

/**
 * @description Displays a <RangePattern /> inside a custom dashed-border
 *  container.
 */
export function ContainedRange({
  rangeId,
  optional = false,
}: ContainedRangeProps) {
  if (optional && !rangeId) return null;
  return (
    <div
      style={{ "--border-color": "#909094" } as React.CSSProperties}
      className="dashed-border grid place-items-center rounded-2xl p-4 @container"
    >
      <RangePattern
        rangeId={rangeId!} // `rangeId` should be defined & not `null`.
        size="size-[clamp(0.75rem,min(10cqw,10cqh),1.25rem)]"
      />
    </div>
  );
}
