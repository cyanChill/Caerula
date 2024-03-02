import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/style";

export type ButtonConfig = VariantProps<typeof buttonVariants>;
const buttonVariants = cva(
  [
    "flex-center border px-2 transition duration-300 ease-in-out",
    "outline-0 ring-white focus:ring-2",
  ],
  {
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
        class: [
          "bg-primary-30 border-primary-30 text-white",
          "hover:bg-primary-20 hover:border-primary-20",
        ],
      },
      {
        variant: "bordered",
        color: "primary",
        class: [
          "border-primary-50 text-primary-50",
          "hover:bg-primary-30 hover:border-primary-30 hover:text-white",
        ],
      },
      {
        variant: "solid",
        color: "secondary",
        class: [
          "bg-secondary-30 border-secondary-30 text-white",
          "hover:bg-secondary-20 hover:border-secondary-20",
        ],
      },
      {
        variant: "bordered",
        color: "secondary",
        class: [
          "border-secondary-70 text-secondary-70",
          "hover:bg-secondary-30 hover:border-secondary-30 hover:text-white",
        ],
      },
      {
        variant: "solid",
        color: "tertiary",
        class: [
          "bg-tertiary-30 border-tertiary-30 text-white",
          "hover:bg-tertiary-20 hover:border-tertiary-20",
        ],
      },
      {
        variant: "bordered",
        color: "tertiary",
        class: [
          "border-tertiary-70 text-tertiary-70",
          "hover:bg-tertiary-30 hover:border-tertiary-30 hover:text-white",
        ],
      },
      {
        variant: "solid",
        color: "neutral",
        class: [
          "bg-neutral-30 border-neutral-30 text-white",
          "hover:bg-neutral-20 hover:border-neutral-20",
        ],
      },
      {
        variant: "bordered",
        color: "neutral",
        class: [
          "border-neutral-70 text-neutral-70",
          "hover:bg-neutral-30 hover:border-neutral-30 hover:text-white",
        ],
      },
    ],
    defaultVariants: {
      color: "primary",
      radius: "default",
      variant: "solid",
    },
  },
);

type Props = ButtonConfig & React.HTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  style,
  variant,
  color,
  radius,
  ...props
}: Props) {
  return (
    <button
      {...props}
      style={style}
      className={cn(buttonVariants({ variant, color, radius }), className)}
    >
      {children}
    </button>
  );
}
