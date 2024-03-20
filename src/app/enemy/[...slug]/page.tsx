import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { XMark } from "@/assets/svgs/navigation";
import type { Enemy, EnemyId, EnemyStat } from "@/data/types/AKEnemy";
import EnemyList from "@/data/enemy/enemyList.json";
import EnemyStatTable from "@/data/enemy/enemyStatTable.json";

import { cn } from "@/lib/style";
import { constructMetadata } from "@/lib/metadata";
import { JotaiProvider } from "@/lib/jotai";
import { pickKeys } from "@/utils/object";
import Tabs, { Tab, TabList, TabPanel } from "@/components/layout/Tabs";
import StatList from "@/features/characters/StatList";
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
    <JotaiProvider>
      <EnemyPageLock />
      <article
        aria-labelledby="enemy-name"
        className="mb-16 grid auto-rows-min gap-4"
      >
        <Link
          href="/enemy"
          className={cn(
            "sticky right-0 top-0 z-[1] aspect-square justify-self-end p-0.5",
            "rounded-full backdrop-blur-lg transition duration-300",
            "text-center text-neutral-80 hover:text-white",
            "bg-neutral-10/50 hover:bg-neutral-20/50",
          )}
        >
          <XMark className="size-7" />
        </Link>

        <HeadingContent
          {...pickKeys(enemy, [
            ...["race", "code", "name", "attackPattern", "type"],
            "lifePointReduction",
          ] as const)}
        />
        <StatsContent
          id={enemy.id}
          weight={enemy.weight}
          stats={EnemyStatTable[enemy.id]}
        />
        <p className="text-sm italic leading-tight text-neutral-60">
          {enemy.description}
        </p>
        <Immunities immunities={enemy.immunities} />
        <Abilities abilityList={enemy.abilityList} />
      </article>
    </JotaiProvider>
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
  type,
}: Pick<
  Enemy,
  "race" | "code" | "name" | "attackPattern" | "lifePointReduction" | "type"
>) {
  return (
    <header className="relative grid gap-2">
      {type !== "NORMAL" && (
        <Image
          src={`/images/enemy/ui/profile/${type.toLowerCase()}.webp`}
          alt=""
          width={32}
          height={32}
          className="absolute -top-12 right-0 size-36 opacity-25 lg:opacity-50"
        />
      )}

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
    </header>
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

type StatsContentProps = { id: EnemyId; stats: EnemyStat[]; weight: number };

/** @description Displays the stats for the current enemy. */
function StatsContent({ id, stats, weight }: StatsContentProps) {
  const tabIds = Array.from({ length: stats.length }, (_, i) => `${i}`);
  return (
    <section className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
      <div className="grid auto-rows-min gap-1 justify-self-center">
        <Image
          src={`/images/enemy/avatar/${id}.webp`}
          alt=""
          width={32}
          height={32}
          className="size-[7.5rem] rounded-md"
        />
        <div
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-0.5",
            "bg-neutral-10 text-sm text-neutral-80",
          )}
        >
          <Image
            src="/images/enemy/ui/profile/weight.webp"
            alt=""
            height={16}
            width={16}
            className="size-[1lh]"
          />{" "}
          Weight {weight}
        </div>
      </div>
      <div>
        <Tabs storeId="enemy-stats" tabKeys={tabIds}>
          <TabList
            label="Enemy Stat levels"
            className="no-scrollbar flex h-min gap-4 overflow-x-scroll p-0.5"
          >
            {tabIds.map((id) => (
              <Tab
                key={id}
                id={id}
                label={`Level ${id}`}
                activeClass="underline"
              >
                Level {id}
              </Tab>
            ))}
          </TabList>
          {stats.map((stat, idx) => (
            <TabPanel key={idx} id={`${idx}`}>
              <StatList stats={stat} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

/** @description Displays the list of immunities the enemy has. */
function Immunities({ immunities }: Pick<Enemy, "immunities">) {
  if (immunities.length === 0) return null;
  return (
    <section>
      <h3 className="mb-2 text-lg font-bold">Immunities</h3>
      <ul className="flex flex-wrap gap-2 text-xs">
        {immunities.map((imm) => (
          <li
            key={imm}
            className="flex-center gap-1 rounded bg-neutralAlt-10 px-2 py-0.5"
          >
            <Image
              src={`/images/enemy/ui/debuff/${imm.toLowerCase()}.webp`}
              alt=""
              width={16}
              height={16}
              className="size-[0.8lh]"
            />
            {imm}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** @description Displays the list of abilities the enemy has. */
function Abilities({ abilityList }: Pick<Enemy, "abilityList">) {
  if (abilityList.length === 0) return null;
  return (
    <section>
      <h3 className="mb-2 text-lg font-bold">Trait</h3>
      <ul className="ml-4 grid gap-2 text-sm">
        {abilityList.map(({ text, textFormat }, idx) => (
          <li
            key={idx}
            dangerouslySetInnerHTML={{ __html: text }}
            className={cn("relative", {
              "list-disc": textFormat === "NORMAL",
              "before:absolute before:-left-6 before:top-0 before:size-[1lh] before:bg-[url(/images/enemy/ui/debuff/silence.webp)] before:bg-contain before:bg-no-repeat":
                textFormat === "SILENCE",
              "my-2 font-semibold text-[#EB3441]": textFormat === "TITLE",
            })}
          />
        ))}
      </ul>
    </section>
  );
}
