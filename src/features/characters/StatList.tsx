import Image from "next/image";

import type { CharacterStat } from "@/data/types/shared";
import type { EnemyStat } from "@/data/types/AKEnemy";

import { cn } from "@/lib/style";

type StatKey = keyof CharacterStat | keyof EnemyStat;
const StatKeyMap: Record<StatKey, string> = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  res: "RES",
  respawnTime: "Redeploy",
  cost: "DP Cost",
  blockCnt: "Block Count",
  mvSpd: "Movement Speed",
  atkInterval: "ATK Interval",
  atkRange: "ATK Range",
  erst: "Elemental RES",
  irst: "Elemental Resistance",
};

/** @description Lists out the stats that are defined in our types. */
export default function StatList<T extends StatKey>(props: {
  stats: Record<T, number>;
  trust?: Record<T, number>;
  className?: string;
}) {
  return (
    <div className={cn("@container", props.className)}>
      <ul
        aria-label="Stats"
        style={
          {
            "--numRows": Math.ceil(Object.keys(props.stats).length / 2),
          } as React.CSSProperties
        }
        className={cn(
          "grid auto-cols-fr gap-0.5 text-[clamp(0.85rem,4cqw,1.15rem)]",
          "min-[350px]:grid-flow-col min-[350px]:grid-rows-[repeat(var(--numRows),1fr)]",
        )}
      >
        {Object.entries(props.stats).map(([key, val]) => (
          <li
            key={key}
            className="grid auto-rows-auto grid-cols-[auto_minmax(0,1fr)] gap-x-1"
          >
            <Image
              src={`/images/ui/attribute/${key}.webp`}
              alt=""
              width={32}
              height={32}
              className="row-span-2 h-[1.25lh] w-auto self-center"
            />
            <span className="truncate font-medium text-neutral-80">
              {StatKeyMap[key as T]}
            </span>
            <span className="text-[0.9em] text-neutral-60">
              {val as number}
              <AsTimeStat id={key} />
              <TrustBonus bonus={props.trust?.[key as T]} />
            </span>
          </li>
        ))}
      </ul>

      {props.trust && (
        <p className="mt-2 text-end text-sm leading-tight text-neutral-60">
          Bonus stats from trust in{" "}
          <span className="text-carrot-60">orange</span>.
        </p>
      )}
    </div>
  );
}

/** @description Adds "s" to stat value if it's time-related. */
function AsTimeStat({ id }: { id: string }) {
  if (!["respawnTime", "atkInterval"].includes(id)) return null;
  return "s";
}

function TrustBonus({ bonus }: { bonus: number | undefined }) {
  if (!bonus) return null;
  return <span className="text-carrot-60"> (+{bonus})</span>;
}
