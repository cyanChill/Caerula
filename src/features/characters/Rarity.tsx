import { Star } from "@/assets/svgs/shapes";

import { cn } from "@/lib/style";

interface Props {
  rarity: number;
  size: `size-${number}` | `size-[${string}]`;
  className?: string;
}

export default function Rarity({ rarity, size, className }: Props) {
  return (
    <div className={cn("flex items-center gap-0.5 text-yellow-500", className)}>
      {Array.from({ length: rarity }, (x, i) => i).map((idx) => (
        <Star key={idx} className={size} />
      ))}
    </div>
  );
}
