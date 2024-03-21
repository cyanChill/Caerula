import { ArrowTopRight } from "@/assets/svgs/navigation";

import { cn } from "@/lib/style";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/layout/Dialog";
import ELink from "@/components/link/ELink";
import { type NavConfigItem, navConfigs } from "./config";

/**
 * @description Primary navigation of application — requires passing down
 *  `<NavList withHome />` to reduce "First Load JS" & "Size".
 */
export function Navbar() {
  return (
    <nav aria-label="main">
      <Dialog>
        <DialogTrigger
          color="custom"
          className={cn(
            "fixed bottom-[15svh] left-0 z-10 px-[0.4em] py-[2em] [writing-mode:vertical-rl]",
            "font-array text-[clamp(0.8rem,0.75vw,4rem)] leading-none tracking-[0.175em]",
            "rounded-none rounded-r-[0.675em] border-[0.125em] border-l-0 border-white",
            "shadow-[0_0_0.5em_0.1em_#95E6FF] [text-shadow:0_0_0.5em_#95E6FF]",
            "bg-surface transition duration-500 hover:brightness-200",
          )}
        >
          MENU
        </DialogTrigger>
        <DialogContent
          origin="left"
          unStrictClick
          className={cn(
            "no-scrollbar !m-0 max-h-dvh overflow-y-auto @container",
            "w-full max-w-screen-2xl p-[1em] pb-[5svh] lg:w-[40vw] lg:min-w-[40rem]",
            "bg-transparent text-[clamp(0.875rem,0.75vw,3rem)] text-white",
          )}
        >
          <p
            className={cn(
              "mx-auto my-[1.75em] w-fit p-[0.5em] text-white/75",
              "rounded-[max(0.25rem,0.5em)] border-[0.125em] border-current",
            )}
          >
            <span className="inline-flex aspect-square items-center rounded-[0.25em] bg-white/75 p-[0.125em] text-black">
              Esc
            </span>{" "}
            or &quot;Click&quot; to close menu.
          </p>
          <NavList withHome />
        </DialogContent>
      </Dialog>
    </nav>
  );
}

/** @description Lists out buttons to routes in our application. */
export function NavList({ withHome = false }: { withHome?: boolean }) {
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

/** @description Stylized link component w/ 2 variants. */
function NavBtn(props: NavConfigItem & { viewExternal?: boolean }) {
  const { type, href, external = false, icon, title, theme } = props;
  const viewExternal = external || !!props.viewExternal;

  return (
    <li className={cn("@container", { "row-span-2": type === "large" })}>
      <ELink
        external={external}
        href={href}
        className={cn(
          "grid h-full grid-flow-dense grid-cols-[minmax(0,1fr)_auto] text-[clamp(0.8rem,8cqw,5rem)]",
          "rounded-[0.5em] outline-none ring-white drop-shadow-xl hover:ring-2 focus:ring-2",
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
              "break-anywhere line-clamp-2 flex-1 py-[0.15em] font-array font-bold leading-tight",
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

/** @description Helps indicate if a link goes to an external page. */
function LinkIcon({ type, external }: LinkIconProps) {
  const iconClass = cn({
    "ml-auto size-[0.5em]": type === "small",
    "size-[1em]": type === "large",
  });
  if (external) return <Rocket className={iconClass} />;
  return <ArrowTopRight className={iconClass} />;
}

function Rocket({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  );
}
