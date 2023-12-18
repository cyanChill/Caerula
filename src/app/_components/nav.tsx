import Image from "next/image";

import { ArrowTopRight } from "@/assets/svgs/direction";
import { GitHub } from "@/assets/svgs/logos";
import {
  CircleWaves,
  Rocket,
  SquareBricks,
  Tiles,
  Waves,
} from "@/assets/svgs/shapes";

import { cn } from "@/lib/style";
import ELink from "@/components/link/ELink";

type BgColor = `bg-${string}-${number}`;
type NavConfigItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
} & (
  | { type: "small"; theme: { background: BgColor } }
  | {
      type: "large";
      theme: { background: BgColor; foreground: BgColor; button: BgColor };
    }
);

const navConfigs: NavConfigItem[] = [
  {
    title: "Home",
    href: "/",
    type: "small",
    icon: (
      <Image
        aria-hidden="true"
        src="/logo.png"
        alt=""
        width={160}
        height={160}
        className="aspect-square w-full"
      />
    ),
    theme: { background: "bg-caerula-120" },
  },
  {
    title: "Operator Network",
    href: "/operator",
    type: "large",
    icon: <CircleWaves className="text-dust-150" />,
    theme: {
      background: "bg-dust-100",
      foreground: "bg-dust-20",
      button: "bg-yellow-500",
    },
  },
  {
    title: "Tokens",
    href: "/token",
    type: "small",
    icon: <Tiles />,
    theme: { background: "bg-desatAqua-70" },
  },
  {
    title: "Enemy Handbook",
    href: "/enemy",
    type: "large",
    icon: <Waves className="text-white" />,
    theme: {
      background: "bg-caerula-40",
      foreground: "bg-dust-100",
      button: "bg-blue-950",
    },
  },
  {
    title: "Terminology",
    href: "/terminology",
    type: "small",
    icon: <SquareBricks className="text-white" />,
    theme: { background: "bg-caerula-80" },
  },
  {
    title: "GitHub",
    href: "https://github.com/cyanChill/Caerula",
    external: true,
    type: "small",
    icon: <GitHub />,
    theme: { background: "bg-dust-100" },
  },
];
const navItemStyles = {
  small: {
    container:
      "row-span-2 grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-x-[max(0.25rem,0.75cqw)]",
    icon: "w-[20cqw]",
  },
  large: {
    container:
      "row-span-5 grid gap-y-[max(0.25rem,0.75cqw)] lg:grid-rows-[repeat(7,minmax(0,1fr))]",
    icon: "w-[40cqw]",
  },
  shared: {
    title:
      "self-end font-array text-cq-heading-3 uppercase leading-none [overflow-wrap:anywhere]",
    linkIcon: "aspect-square w-[8.5cqw]",
  },
};

interface NavListProps {
  withHome?: boolean;
}

export function NavList({ withHome = false }: NavListProps) {
  const items = withHome ? navConfigs : navConfigs.toSpliced(0, 1);

  return (
    <ul className="grid auto-rows-fr grid-cols-2 gap-[max(0.375rem,1cqw)]">
      {items.map(({ external, type, title, href, icon, theme }) => {
        const IndicatorIcon = external ? Rocket : ArrowTopRight;
        return (
          <ELink
            key={title}
            external={external ?? false}
            href={href}
            className={cn(
              navItemStyles[type].container,
              "rounded-[max(0.375rem,1cqw)] p-[max(0.375rem,1cqw)] @container",
              "bg-opacity-50 backdrop-blur-2xl transition duration-500 hover:bg-opacity-75",
              theme.background,
            )}
          >
            <div
              className={cn(
                "flex-center rounded-[3cqw] p-[2.5cqw]",
                // tailwind-merge doesn't correctly merge `row-span-*` classes
                type === "large" ? "row-span-4" : "row-span-full",
                type === "large" ? theme.foreground : theme.background,
              )}
            >
              <div className={navItemStyles[type].icon}>{icon}</div>
            </div>

            {type === "small" ? (
              <>
                <IndicatorIcon
                  className={cn(
                    navItemStyles.shared.linkIcon,
                    "justify-self-end rounded-[2cqw] border-[0.5cqw] border-white p-[0.75cqw]",
                  )}
                />
                <p className={navItemStyles.shared.title}>{title}</p>
              </>
            ) : (
              <>
                <p className={cn(navItemStyles.shared.title, "sm:row-span-2")}>
                  {title}
                </p>
                <div
                  className={cn(
                    "flex justify-end rounded-[max(0.25rem,2cqw)] px-1 sm:p-[1.5cqw]",
                    theme.button,
                  )}
                >
                  <IndicatorIcon className={navItemStyles.shared.linkIcon} />
                </div>
              </>
            )}
          </ELink>
        );
      })}
    </ul>
  );
}
