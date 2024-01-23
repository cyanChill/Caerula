import { cn } from "@/lib/style";

export default function ScrollShadow(props: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative before:pointer-events-none after:pointer-events-none",
        "before:absolute before:left-0 before:top-0 before:z-[1] before:h-full before:w-8 lg:before:w-16",
        "before:bg-gradient-to-r before:from-surface before:to-surface/0",
        "after:absolute after:right-0 after:top-0 after:z-[1] after:h-full after:w-8 lg:after:w-16",
        "after:bg-gradient-to-l after:from-surface after:to-surface/0",
      )}
    >
      {props.children}
    </div>
  );
}
