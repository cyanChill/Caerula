"use client";
import { useRef, useMemo } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { ScopeProvider } from "jotai-scope";

import { useKey } from "@/hooks/useKey";

import { cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import { Button } from "../form/Button";

const animationAtom = atom({ in: "", out: "", durationMS: 0 });
const dialogRefAtom = atom<HTMLDialogElement | null>(null);

const openDialogAtom = atom((get) => () => {
  const dialogRef = get(dialogRefAtom);
  if (!dialogRef) return;
  dialogRef.showModal();
  document.body.setAttribute("data-lock", "true");
});
const closeDialogAtom = atom((get) => () => {
  const dialogRef = get(dialogRefAtom);
  const animation = get(animationAtom);
  if (!dialogRef) return;

  if (!!animation.out) {
    // Trigger closing animation
    dialogRef.classList.add(animation.out);
    setTimeout(() => {
      dialogRef.classList.remove(animation.out);
      dialogRef.close();
    }, animation.durationMS);
  } else dialogRef.close();
});

type Animation = `animate-[${string}]`;

type DialogProps = {
  animation?: { in: Animation; out: Animation; durationMS: number };
  children: React.ReactNode;
};

/**
 * @description The context provider for this component. All dialog-related
 *  components must be under this.
 */
export function Dialog({ animation, children }: DialogProps) {
  return (
    <ScopeProvider atoms={[dialogRefAtom, animationAtom]}>
      <HydrateAtoms
        atomValues={[
          [animationAtom, animation ?? { in: "", out: "", durationMS: 0 }],
        ]}
      >
        {children}
      </HydrateAtoms>
    </ScopeProvider>
  );
}

type ButtonProps = React.ComponentProps<typeof Button>;

/**
 * @description A `<Button />` that opens up the dialog and displays
 *  `<DialogContent />`.
 */
export function DialogTrigger({
  onClick,
  children,
  className,
  ...props
}: ButtonProps) {
  const openDialog = useAtomValue(openDialogAtom);
  return (
    <Button
      {...props}
      onClick={(e) => {
        if (onClick) onClick(e);
        openDialog();
      }}
      className={cn("z-[1]", className)}
    >
      {children}
    </Button>
  );
}

/** @description A `<Button />` that closes the dialog. */
export function DialogClose({ onClick, children, ...props }: ButtonProps) {
  const closeDialog = useAtomValue(closeDialogAtom);
  return (
    <Button
      {...props}
      onClick={(e) => {
        if (onClick) onClick(e);
        closeDialog();
      }}
    >
      {children}
    </Button>
  );
}

/**
 * @description A HTML `<dialog>` element which automatically applies the
 *  opening & closing animations.
 *
 *
 *  ❗It's suggested to wrap the children with another element due to how
 *  we implemented the "close on backdrop click" behavior.❗
 */
export function DialogContent({
  onClick,
  onClose,
  children,
  className,
  ...props
}: React.DialogHTMLAttributes<HTMLDialogElement>) {
  const animation = useAtomValue(animationAtom);
  const closeDialog = useAtomValue(closeDialogAtom);

  // Set atom value on mount
  // -  https://github.com/pmndrs/jotai/discussions/1488#discussioncomment-3942011
  const ref = useRef<HTMLDialogElement>(null);
  const mountingAtom = useMemo(() => {
    const a = atom(
      (get) => get(dialogRefAtom),
      (_, set, arg: HTMLDialogElement | null) => set(dialogRefAtom, arg),
    );
    a.onMount = (set) => {
      set(ref.current);
      trapFocus(ref.current as HTMLElement);
    };
    return a;
  }, []);
  useAtom(mountingAtom);

  useKey("Escape", closeDialog);

  return (
    <dialog
      {...props}
      ref={ref}
      onClick={(e) => {
        if (onClick) onClick(e);
        // If our child is a single wrapper element, we close the modal
        // when we click on the backdrop
        if (e.target === e.currentTarget) closeDialog();
      }}
      onClose={(e) => {
        if (onClose) onClose(e);
        document.body.removeAttribute("data-lock");
      }}
      className={cn(
        "backdrop:bg-black/50 backdrop:backdrop-blur-2xl",
        className,
        animation.in,
      )}
    >
      {children}
    </dialog>
  );
}

/** @description Traps focus within element. */
function trapFocus(el: HTMLElement) {
  // https://hidde.blog/using-javascript-to-trap-focus-in-an-element
  const focusableEls = el.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
  );
  const firstFocusableEl = focusableEls[0] as HTMLElement;
  const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;

  el.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return; // If tab isn't pressed

    if (e.shiftKey) {
      // If we `shift + tab`
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      // If we only `tab`
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}
