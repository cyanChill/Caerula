import { cn } from "@/lib/style";

export default function TransformArrow({
  active,
  className,
}: {
  active: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M5.5 1H19V14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className={cn("origin-top-right scale-0 transform duration-500", {
          "scale-100": active,
        })}
      />
      <path
        d="M1 19L19 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
