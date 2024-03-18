import { cn } from "@/lib/style";
import { Button } from "@/components/form/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/layout/Dialog";
import { INTERNAL_FORM } from "./client";

/** @description Filter menu button w/ pop-out modal form. */
export function FilterMenu(props: {
  formControls: React.ReactNode;
  menuBtnClassName?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        color="tertiary"
        radius="medium"
        className={cn(
          "gap-1 py-0.5 font-geist-sans text-sm",
          props.menuBtnClassName,
        )}
      >
        <FilterSVG />
        Filters
      </DialogTrigger>

      <DialogContent
        animation="animate-[slide-in-right_0.5s] data-[close]:animate-[slide-out-right_0.5s]"
        className={cn(
          "ml-auto mr-2 h-[95dvh] w-full max-w-[calc(100%-1rem)] sm:mr-4 sm:max-w-[450px]",
          "rounded-xl bg-neutral-10 font-geist-sans text-white",
        )}
      >
        <div className="grid h-full grid-rows-[minmax(0,1fr)_auto]">
          <INTERNAL_FORM>{props.formControls}</INTERNAL_FORM>
          <div className="p-2 !pt-0 sm:p-4">
            <hr className="mb-4 border-white/50" />
            <div
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)] gap-1 sm:gap-2",
                "font-geist-mono font-medium sm:text-lg",
              )}
            >
              <Button
                title="Reset Filters"
                type="reset"
                form="filter-form"
                variant="bordered"
                color="neutral"
                radius="large"
                className="p-2"
              >
                <RefreshSVG />
              </Button>
              <DialogClose
                type="submit"
                form="filter-form"
                color="tertiary"
                radius="large"
                className="p-2"
              >
                View Changes
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FilterSVG() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-[1lh]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
      />
    </svg>
  );
}

function RefreshSVG() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-[1lh]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}
