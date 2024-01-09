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

import type { BgColor } from "@/lib/style";
import { cn } from "@/lib/style";
import ELink from "@/components/link/ELink";

type NavConfigItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
} & (
  | { type: "small"; theme?: { primary: BgColor } }
  | { type: "large"; theme: { primary: BgColor; button: BgColor } }
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
    theme: { primary: "bg-[#233852]" },
  },
  {
    title: "Operator Network",
    href: "/operator",
    type: "large",
    icon: <CircleWaves />,
    theme: { primary: "bg-[#001F44]", button: "bg-yellow-500" },
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
    theme: { primary: "bg-teal-900", button: "bg-[#5F9EA0]" },
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

interface NavListProps {
  withHome?: boolean;
}

export function NavList({ withHome = false }: NavListProps) {
  const items = withHome ? navConfigs : navConfigs.toSpliced(0, 1);
  return (
    <ul className="grid auto-rows-fr gap-2 [--min-col-size:25rem] @md:grid-cols-2 @6xl:grid-cols-autoFit @6xl:gap-4">
      {items.map((navItem) => (
        <NavBtn
          key={navItem.title}
          {...navItem}
          viewExternal={navItem.href === "/"}
        />
      ))}
    </ul>
  );
}

type NavBtnProps = NavConfigItem & { viewExternal?: boolean };

function NavBtn(props: NavBtnProps) {
  const { type, href, external = false, icon, title, theme } = props;
  const viewExternal = external || !!props.viewExternal;

  return (
    <li className={cn("@container", { "row-span-2": type === "large" })}>
      <ELink
        external={external}
        href={href}
        className={cn(
          "grid h-full grid-flow-dense grid-cols-[minmax(0,1fr)_auto] text-[clamp(0.8rem,8cqw,5rem)]",
          "rounded-[0.5em] outline-0 ring-white drop-shadow-xl hover:ring-2 focus:ring-2",
          {
            "grid-cols-[auto_minmax(0,1fr)]": type === "small" && viewExternal,
            "grid-cols-1 grid-rows-[minmax(0,1fr)_auto]": type === "large",
          },
        )}
      >
        <div
          className={cn(
            "flex-center rounded-[0.5em] bg-neutral-20/75 p-[0.25em]",
            {
              "col-start-2": type === "small" && !viewExternal,
              "bg-neutral-90": type === "large" || viewExternal,
            },
          )}
        >
          <div
            className={cn("w-[20cqw] object-contain", {
              "w-[45cqw] text-black": type === "large",
            })}
          >
            {icon}
          </div>
        </div>

        <div
          className={cn("flex rounded-[0.5em]", {
            "flex-col px-[0.5em] py-[0.25em]": type === "small",
            [theme?.primary ?? "bg-neutral-10/75"]: type === "small",
          })}
        >
          <p
            className={cn(
              "line-clamp-2 flex-1 py-[0.15em] font-array font-bold leading-tight [overflow-wrap:anywhere]",
              { "rounded-[0.5em] px-[0.5em]": type === "large" },
              type === "large" ? theme.primary : "",
            )}
          >
            <span className="h-[2lh]">{title}</span>
          </p>
          <div
            className={cn(
              "rounded-full px-[0.15em] py-[0.1em]",
              {
                "w-[22.5cqw] self-end border border-current text-neutral-80":
                  type === "small",
                "bg-current *:text-black": type === "small" && viewExternal,
                "flex-center shrink-0 rounded-[0.5em]": type === "large",
              },
              type === "large" ? theme.button : "",
            )}
          >
            <LinkIcon type={type} external={external} />
          </div>
        </div>
      </ELink>
    </li>
  );
}

type LinkIconProps = { type: "small" | "large"; external?: boolean };

function LinkIcon({ type, external }: LinkIconProps) {
  const iconClass = cn({
    "ml-auto size-[0.5em]": type === "small",
    "size-[1em]": type === "large",
  });
  if (external) return <Rocket className={iconClass} />;
  return <ArrowTopRight className={iconClass} />;
}
