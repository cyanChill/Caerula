import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { XMark } from "@/assets/svgs/navigation";
import type { Enemy } from "@/data/types/AKEnemy";
import EnemyList from "@/data/enemy/enemyList.json";
import EnemyStatTable from "@/data/enemy/enemyStatTable.json";

import { cn } from "@/lib/style";
import { constructMetadata } from "@/lib/metadata";
import { JotaiProvider } from "@/lib/jotai";
import { pickKeys } from "@/utils/object";
import EnemyPageLock from "./_components/enemyPageLock";

interface Props {
  params: { slug: string[] };
}

/** @description Statically generate routes instead of on-demand at request time. */
export function generateStaticParams() {
  return EnemyList.map(({ slug }) => ({ slug: [...slug.split("/")] }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug.join("/"));
  const enemy = EnemyList.find((e) => e.slug === slug);

  if (!enemy) {
    return {
      title: { absolute: "Enemy Not Found!" },
      description: "Enemy not found.",
    };
  }

  return constructMetadata({
    parentMetadata: await parent,
    title: enemy.name,
    description: enemy.description,
    route: `/enemy/${enemy.slug}`,
  });
}

export default function Enemy({ params }: Props) {
  const slug = decodeURIComponent(params.slug.join("/"));
  const enemy = EnemyList.find((e) => e.slug === slug);
  if (!enemy) notFound();

  return (
    <>
      <EnemyPageLock />
      <article
        aria-labelledby="enemy-name"
        className={cn("grid auto-rows-min gap-2")}
      >
        <Link
          href="/enemy"
          className={cn(
            "z-[1] aspect-square justify-self-end rounded-full p-0.5 backdrop-blur-lg",
            "text-center text-neutral-80 transition duration-300 hover:text-white",
            "bg-neutral-10/50 hover:bg-neutral-20/50",
          )}
        >
          <XMark className="size-7" />
        </Link>

        {enemy.type !== "NORMAL" && (
          <Image
            src={`/images/enemy/ui/profile/${enemy.type.toLowerCase()}.webp`}
            alt=""
            width={32}
            height={32}
            className="absolute right-2 top-2 row-span-4 size-36 opacity-25 lg:opacity-50"
          />
        )}

        <HeadingContent
          {...pickKeys(enemy, [
            ...["race", "code", "name", "attackPattern"],
            "lifePointReduction",
          ] as const)}
        />
      </article>
    </>
  );
}

/**
 * @description Introduces the enemy by displaying their race, code, name,
 *  attack pattern, and life points deduction.
 */
function HeadingContent({
  race,
  code,
  name,
  attackPattern,
  lifePointReduction,
}: Pick<
  Enemy,
  "race" | "code" | "name" | "attackPattern" | "lifePointReduction"
>) {
  return (
    <>
      <p className="min-h-[1lh] text-sm	text-[#7AAAA6]">{race}</p>
      <div className="flex gap-2">
        <span
          aria-hidden="true"
          className="h-min rounded bg-neutralAlt-20 px-2 text-sm"
        >
          {code}
        </span>
        <h2 id="enemy-name" className="break-anywhere text-2xl leading-none">
          {name}
        </h2>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="min-h-[1lh] text-sm	text-neutral-80">{attackPattern}</p>
        <LPCost {...{ lifePointReduction }} />
      </div>
    </>
  );
}

/**
 * @description Renders the "widget" displaying the number of lifepoints
 *  lost when the enemy enters the Protection Objective.
 */
function LPCost({ lifePointReduction }: { lifePointReduction: number }) {
  if (lifePointReduction === 1) return null;
  const isZero = lifePointReduction === 0;

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-lg font-bold text-[#0098DC] lg:gap-4",
        { "text-[#B52624]": !isZero },
      )}
    >
      <Image
        src={`/images/enemy/ui/profile/life_point${!isZero ? "_alt" : ""}.webp`}
        alt=""
        width={32}
        height={32}
        className="size-[1lh]"
      />
      <span>{lifePointReduction}</span>
    </div>
  );
}
