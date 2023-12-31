import { Star } from "@/assets/svgs/shapes";

interface Props {
  rarity: number;
  size: `size-${number}` | `size-[${string}]`;
}

export default function Rarity({ rarity, size }: Props) {
  return (
    <div className="flex gap-0.5 text-yellow-500">
      {Array.from({ length: rarity }, (x, i) => i).map((idx) => (
        <Star key={idx} className={size} />
      ))}
    </div>
  );
}
