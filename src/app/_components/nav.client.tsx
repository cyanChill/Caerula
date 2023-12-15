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
          "fixed bottom-[15svh] left-0 z-10 px-[0.125em] py-[2em] [writing-mode:vertical-rl]",
          "font-array text-[clamp(0.875rem,1.05vw,5rem)] tracking-[0.175em]",
          "rounded-r-[max(0.25rem,0.675em)] border-[0.125em] border-l-0 border-dust-0",
          "shadow-[0_0_0.3125em_0.0625em_#95E6FF] [text-shadow:0_0_0.5em_#95E6FF]",
          "bg-caerula-180 transition duration-500 hover:brightness-200",
        )}
      >
        MENU
      </button>

      <div
        onClick={() => setNavVisibility(false)}
        className={cn(
          "pointer-events-none fixed inset-0 z-20 overflow-clip",
          "opacity-0 backdrop-blur-2xl transition-opacity duration-500",
          { "pointer-events-auto opacity-100": show },
        )}
      >
        <div
          id="main-nav-menu"
          ref={menuContainerRef}
          className={cn(
            "no-scrollbar invisible fixed inset-0 z-50 overflow-y-auto",
            "w-full p-[max(0.375rem,1cqw)] pb-[2cqw] lg:w-[50vw]",
            "-translate-x-full opacity-0 transition-[visibility_opacity_transform] duration-500",
            { "visible translate-x-0 opacity-100": show },
          )}
        >
          <p
            tabIndex={-1}
            ref={messageRef}
            className={cn(
              "mx-auto my-[1.75em] w-fit p-[0.375em]",
              "text-[clamp(0.875rem,1.05vw,5rem)] text-dust-0/75",
              "rounded-[max(0.25rem,0.5em)] border-[0.125em] border-current",
            )}
          >
            <span className="inline-block aspect-square rounded-[0.25em] bg-dust-0/75 p-[0.125em] align-middle text-caerula-180">
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
