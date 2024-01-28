import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/style";

export type ChipConfig = VariantProps<typeof chipVariants>;
const chipVariants = cva(["inline-flex px-[0.5em] border-[max(1px,0.125em)]"], {
  variants: {
    variant: { solid: "", bordered: "" },
    color: {
      primary: "",
      secondary: "",
      tertiary: "",
      neutral: "",
      custom: "",
    },
    radius: {
      default: "rounded",
      medium: "rounded-md",
      large: "rounded-lg",
      pill: "rounded-full",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      class: "bg-primary-30 border-primary-30 text-white",
    },
    {
      variant: "bordered",
      color: "primary",
      class: "border-primary-60 text-primary-60",
    },
    {
      variant: "solid",
      color: "secondary",
      class: "bg-secondary-30 border-secondary-30 text-white",
    },
    {
      variant: "bordered",
      color: "secondary",
      class: "border-secondary-70 text-secondary-70",
    },
    {
      variant: "solid",
      color: "tertiary",
      class: "bg-tertiary-70 border-tertiary-70 text-black",
    },
    {
      variant: "bordered",
      color: "tertiary",
      class: "border-tertiary-70 text-tertiary-70",
    },
    {
      variant: "solid",
      color: "neutral",
      class: "bg-neutral-30 border-neutral-30 text-white",
    },
    {
      variant: "bordered",
      color: "neutral",
      class: "border-neutral-70 text-neutral-70",
    },
  ],
  defaultVariants: {
    color: "primary",
    radius: "default",
    variant: "solid",
  },
});

interface Props extends ChipConfig {
  icon?: React.ReactNode;
  children: React.ReactNode;
  asListItem?: boolean;
  className?: string;
}

export default function Chip({
  icon,
  children,
  asListItem,
  className,
  ...config
}: Props) {
  const ChipTag = asListItem ? "li" : "div";
  return (
    <ChipTag className={cn(chipVariants({ ...config }), className)}>
      {icon && <span className="flex-center">{icon}</span>}
      <span className={cn({ "pl-[0.325em]": !!icon })}>{children}</span>
    </ChipTag>
  );
}
