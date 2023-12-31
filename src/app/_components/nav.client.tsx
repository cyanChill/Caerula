"use client";
import { useState, useRef } from "react";

import { useKey } from "@/hooks/useKey";

import { cn } from "@/lib/style";
import { NavList } from "./nav";

export function Navbar() {
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const [show, setShow] = useState(false);

  function setNavVisibility(isVisible: boolean) {
    setShow(isVisible);
    if (isVisible === false) openBtnRef.current?.focus();
    else menuContainerRef.current?.scrollTo(0, 0);
    // Prevent scroll on the body if the menu is open
    document.body.setAttribute("data-lock", `${isVisible}`);
  }

  useKey("Escape", () => setNavVisibility(false));

  return (
    <nav aria-label="main">
      <button
        ref={openBtnRef}
        aria-expanded={show}
        aria-controls="main-nav-menu"
        onClick={() => setNavVisibility(true)}
        className={cn(
          "fixed bottom-[15svh] left-0 z-10 px-[0.4em] py-[2em] [writing-mode:vertical-rl]",
          "font-array text-[clamp(0.8rem,0.75vw,4rem)] leading-none tracking-[0.175em]",
          "rounded-r-[0.675em] border-[0.125em] border-l-0 border-white",
          "shadow-[0_0_0.5em_0.1em_#95E6FF] [text-shadow:0_0_0.5em_#95E6FF]",
          "bg-caerula-180 transition duration-500 hover:brightness-200",
        )}
      >
        MENU
      </button>

      <div
        onClick={() => setNavVisibility(false)}
        className={cn(
          "pointer-events-none fixed inset-0 z-20 overflow-clip",
          "bg-black/75 opacity-0 backdrop-blur-2xl transition-opacity duration-500",
          { "pointer-events-auto opacity-100": show },
        )}
      >
        <div
          id="main-nav-menu"
          ref={menuContainerRef}
          className={cn(
            "no-scrollbar invisible fixed inset-0 z-50 overflow-y-auto @container",
            "w-full max-w-screen-2xl p-[1em] pb-[5svh] text-[clamp(0.875rem,0.75vw,3rem)] lg:w-[40vw] lg:min-w-[40rem]",
            "-translate-x-full opacity-0 transition-[visibility_opacity_transform] duration-500",
            { "visible translate-x-0 opacity-100": show },
          )}
        >
          <p
            tabIndex={-1}
            ref={messageRef}
            className={cn(
              "mx-auto my-[1.75em] w-fit p-[0.5em] text-white/75",
              "rounded-[max(0.25rem,0.5em)] border-[0.125em] border-current",
            )}
          >
            <span className="inline-flex aspect-square items-center rounded-[0.25em] bg-white/75 p-[0.125em] text-caerula-180">
              Esc
            </span>{" "}
            or &quot;Click&quot; to close menu.
          </p>
          <NavList withHome />
          <div tabIndex={0} onFocus={() => messageRef.current!.focus()} />
        </div>
      </div>
    </nav>
  );
}
