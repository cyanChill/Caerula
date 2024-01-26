import Image from "next/image";

import type { Affiliations } from "@/data/types/AKAffiliation";
import { NationInfo, FactionInfo, TeamInfo } from "@/data/types/AKAffiliation";

import type { BgColor } from "@/lib/style";
import { cn } from "@/lib/style";
import { isKeyOf } from "@/utils/typeNarrow";

interface Props {
  network: Affiliations;
}

/** @description Visual representation of the network a character belongs to.  */
export default function Network({ network: { nation, faction, team } }: Props) {
  return (
    <>
      <NetworkEntry
        data={getNetworkData(nation)}
        type="Nation"
        theme="bg-neutralAlt-20/75"
      />
      <NetworkEntry
        data={getNetworkData(faction)}
        type="Faction"
        theme="bg-neutral-20/75"
      />
      <NetworkEntry
        data={getNetworkData(team)}
        type="Team"
        theme="bg-neutral-30/75"
      />
    </>
  );
}

function getNetworkData(
  key: string | undefined | null,
): { id: string; name: string } | undefined {
  if (!key) return undefined;
  else if (isKeyOf(key, NationInfo)) return NationInfo[key];
  else if (isKeyOf(key, FactionInfo)) return FactionInfo[key];
  else if (isKeyOf(key, TeamInfo)) return TeamInfo[key];
  throw new Error(`Unexpected type for input value: ${key}`);
}

interface NetworkEntryProps {
  data: ReturnType<typeof getNetworkData>;
  type: "Nation" | "Faction" | "Team";
  theme: `${BgColor}/75`;
}

function NetworkEntry({ data, type, theme }: NetworkEntryProps) {
  if (!data) return null;
  return (
    <div
      className={cn(
        "card grid aspect-square grid-rows-[minmax(0,1fr),auto] gap-2 p-2 @container sm:p-4",
        theme,
      )}
    >
      <Image
        src={`/images/operator/affiliation/logo_${data.id}.webp`}
        alt={`${type} - ${data.name}`}
        width={128}
        height={128}
        className="size-full object-contain"
      />
      <p
        aria-hidden="true"
        className="line-clamp-2 h-[2lh] text-center text-[clamp(0.6rem,7cqw,1.1rem)] text-neutral-80"
      >
        {data.name}
      </p>
    </div>
  );
}
