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

import type { BgColor, BorderColor } from "@/lib/style";
import { cn } from "@/lib/style";
import ELink from "@/components/link/ELink";

type ThemeColors = `${BgColor} ${BorderColor}/75`;
type NavConfigItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
} & (
  | { type: "small"; theme?: { primary: ThemeColors } }
  | { type: "large"; theme: { primary: ThemeColors; button: BgColor } }
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
        className="size-full"
      />
    ),
    theme: { primary: "bg-caerula-80 border-caerula-80/75" },
  },
  {
    title: "Operator Network",
    href: "/operator",
    type: "large",
    icon: <CircleWaves />,
    theme: {
      primary: "bg-caerula-100 border-caerula-100/75",
      button: "bg-yellow-500",
    },
  },
  {
    title: "Tokens",
    href: "/token",
    type: "small",
    icon: <Tiles />,
  },
  {
    title: "Enemy Handbook",
    href: "/enemy",
    type: "large",
    icon: <Waves />,
    theme: {
      primary: "bg-teal-900 border-teal-900/75",
      button: "bg-[#5F9EA0]",
    },
  },
  {
    title: "Terminology",
    href: "/terminology",
    type: "small",
    icon: <SquareBricks />,
  },
  {
    title: "GitHub",
    href: "https://github.com/cyanChill/Caerula",
    external: true,
    type: "small",
    icon: <GitHub />,
  },
];
const navItemStyles = {
  small: {
    wrapper: "row-span-2",
    container:
      "grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-x-[0.25em]",
    icon: "w-[20cqw]",
  },
  large: {
    wrapper: "row-span-5",
    container: "gap-[0.25em] lg:grid-rows-7",
    icon: "w-[40cqw] text-dust-150",
  },
  shared: {
    title:
      "self-end font-array uppercase leading-none [overflow-wrap:anywhere]",
    linkIcon: "size-[0.75em]",
  },
};

interface NavListProps {
  withHome?: boolean;
}

export function NavList({ withHome = false }: NavListProps) {
  const items = withHome ? navConfigs : navConfigs.toSpliced(0, 1);

  return (
    <ul className="grid auto-rows-fr gap-2 @[15.5rem]:grid-cols-2 @md:gap-4 @3xl:grid-cols-3">
      {items.map(({ external, type, title, href, icon, theme }) => {
        const IndicatorIcon = external ? Rocket : ArrowTopRight;
        const currStyle = navItemStyles[type];
        const sharedStyle = navItemStyles.shared;

        return (
          <li key={title} className={cn(currStyle.wrapper, "@container")}>
            <ELink
              external={external ?? false}
              href={href}
              className={cn(
                currStyle.container,
                "grid h-full rounded-[0.375em] border-[0.075em] p-[0.25em] text-cq-heading-3",
                "bg-opacity-50 shadow-[0_0.05em_0.1em_#00000040] backdrop-blur-2xl",
                "transition duration-500 hover:bg-opacity-75",
                theme?.primary ?? "border-dust-100/75 bg-dust-100",
              )}
            >
              <div
                className={cn(
                  // tailwind-merge doesn't correctly merge `row-span-*` classes
                  type === "large" ? "row-span-4" : "row-span-full",
                  "flex-center rounded-[0.2em] p-[0.25em]",
                  theme?.primary.split(" ")[0] ?? "bg-dust-100",
                  { "bg-dust-20": type === "large" || title === "GitHub" },
                )}
              >
                <div className={currStyle.icon}>{icon}</div>
              </div>

              {type === "small" ? (
                <>
                  <IndicatorIcon
                    className={cn(
                      sharedStyle.linkIcon,
                      "justify-self-end rounded-[0.2em] border-[0.05em] border-white p-[0.1em]",
                    )}
                  />
                  <p className={sharedStyle.title}>{title}</p>
                </>
              ) : (
                <>
                  <p className={cn(sharedStyle.title, "sm:row-span-2")}>
                    {title}
                  </p>
                  <div
                    className={cn(
                      "flex items-center justify-end rounded-[0.2em] px-1 sm:p-[0.1em]",
                      theme.button,
                    )}
                  >
                    <IndicatorIcon className={sharedStyle.linkIcon} />
                  </div>
                </>
              )}
            </ELink>
          </li>
        );
      })}
    </ul>
  );
}
