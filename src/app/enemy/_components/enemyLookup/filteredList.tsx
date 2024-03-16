"use client";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";

import { filteredEnemiesListAtom } from "./store";

import { cn } from "@/lib/style";

/** @description List of filtered enemies. */
export function FilteredEnemyList() {
  const enemies = useAtomValue(filteredEnemiesListAtom);

  if (enemies.length === 0) {
    return (
      <p className="p-2 text-center text-sm text-neutral-70">
        No enemies matched the selected filters.
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-autoFill gap-2 [--min-col-size:4rem] sm:[--min-col-size:5rem]",
        "overflow-y-auto p-2 text-xs",
      )}
    >
      {enemies.map(({ id, slug, name, code }) => (
        <li key={id}>
          <Link
            href={`/enemy/${slug}`}
            className="relative block rounded-md bg-neutral-10/50"
          >
            <span
              aria-hidden="true"
              className="absolute left-[3px] top-[3px] rounded-md bg-black px-2"
            >
              {code}
            </span>
            <Image
              src={`/images/enemy/avatar/${id}.webp`}
              alt={name}
              width={48}
              height={48}
              className="size-full"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
