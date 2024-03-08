import { cn } from "@/lib/style";

interface Props {
  rarity: number;
  size: `size-${number}` | `size-[${string}]`;
  className?: string;
}

/** @description Displays the number of stars corresponding to the specified rarity. */
export default function Rarity({ rarity, size, className }: Props) {
  return (
    <div
      role="img"
      aria-label={`${rarity}-Star Rarity`}
      className={cn("flex items-center gap-0.5 text-yellow-500", className)}
    >
      {Array.from({ length: rarity }, (x, i) => i).map((idx) => (
        <Star key={idx} className={size} />
      ))}
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 350"
      fill="none"
      className={className}
    >
      <path
        d="M8.43739 341.563C89.9026 245.595 89.9026 104.405 8.43737 8.43737C104.405 89.9026 245.595 89.9026 341.563 8.43739C260.097 104.405 260.097 245.595 341.563 341.563C245.595 260.097 104.405 260.097 8.43739 341.563Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
