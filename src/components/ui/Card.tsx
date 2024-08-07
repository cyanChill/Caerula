import { cn } from "@/lib/style";
import Icon from "@/components/image/Icon";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article";
  defaultPadding?: boolean;
  children: React.ReactNode;
}

/** @description Basic card component. */
export default function Card({
  as: As = "div",
  defaultPadding = false,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <As
      {...props}
      className={cn(
        "rounded-2xl drop-shadow-xl",
        { "p-2 sm:p-4": defaultPadding },
        className,
      )}
    >
      {children}
    </As>
  );
}

interface CardTitleProps {
  as?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
  icon?: string | React.ReactNode; // ie: Image Source of React SVG component
  breakColor?: `border-${string}`;
  className?: string;
  children: string;
}

/** @description A header designed to be used inside a `<Card />`. */
export function CardTitle({
  as: As = "h2",
  breakColor = "border-white/10",
  ...props
}: CardTitleProps) {
  return (
    <>
      <div className={cn("mb-2 flex items-center", props.className)}>
        <TitleIcon icon={props.icon} />
        <As>{props.children}</As>
      </div>
      <hr className={breakColor} />
    </>
  );
}

function TitleIcon({ icon }: { icon?: string | React.ReactNode }) {
  if (!icon) return null;
  return (
    <Icon
      {...(typeof icon === "string"
        ? { as: "string", icon, className: "mr-2 size-[1em] object-contain" }
        : { as: "node", icon })}
    />
  );
}
