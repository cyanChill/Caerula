"use client";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";

import {
  levelAtom,
  maxLevelAtom,
  promotionAtom,
  maxPromotionAtom,
  recipientIdAtom,
  statAtom,
  rangeAtom,
  bonusAtom,
  setLevelAtom,
  setPromotionAtom,
  setRecipientAtom,
} from "./store";

import { cn } from "@/lib/style";
import TransformArrow from "@/components/accents/TransformArrow";
import Tabs, { TabPanel } from "@/components/layout/Tabs";
import Knob from "@/components/form/Knob";
import Slider from "@/components/form/Slider";
import { ContainedRange } from "@/features/characters/RangePattern";
import StatList from "@/features/characters/StatList";

/** @description Returns the current level as a component. */
export function CurrentLevel(): React.ReactNode {
  const level = useAtomValue(levelAtom);
  return level;
}

/** @description Allows us to modify the current level in our Experience store. */
export function LevelKnob() {
  const maxLevel = useAtomValue(maxLevelAtom);
  const promotion = useAtomValue(promotionAtom);
  const setLevel = useSetAtom(setLevelAtom);
  return (
    <Knob
      key={promotion} // Refreshes internal state without useEffect
      label="Level Selector"
      options={{
        min: 1,
        max: maxLevel,
        trackWidth: `clamp(0.4rem, 7.75cqw, 1.25rem)`,
      }}
      propagateVal={setLevel}
    />
  );
}

/** @description Icon representing the current promotion. */
export function PromotionIcon({ icons }: { icons: React.ReactNode[] }) {
  const promotion = useAtomValue(promotionAtom);
  return icons[promotion];
}

/** @description Allows modification of the current promotion in our Experience store. */
export function PromotionSlider() {
  const maxPromotion = useAtomValue(maxPromotionAtom);
  const setPromotion = useSetAtom(setPromotionAtom);
  return (
    <Slider
      label="Promotion Selector"
      options={{
        min: 0,
        max: maxPromotion,
        trackWidth: `clamp(0.4rem, 7.75cqw, 1.25rem)`,
      }}
      propagateVal={setPromotion}
      theme={{ track: { active: "#E5A530" } }}
    />
  );
}

/** @description Tabs provider that connects to our Experience store. */
export function StatsTabsProvider({
  tabKeys,
  StatsTabList,
}: {
  tabKeys: string[];
  StatsTabList: React.ReactNode;
}) {
  const setRecipient = useSetAtom(setRecipientAtom);
  return (
    <Tabs storeId="char-stat" tabKeys={tabKeys} onChange={setRecipient}>
      {StatsTabList}
      <StatsTabPanel />
    </Tabs>
  );
}

/** @description Tab panel displaying the stat & range for the current recipient. */
function StatsTabPanel() {
  const recipientId = useAtomValue(recipientIdAtom);
  /*
    Different way of using `<Tab.TabPanel />` if we know what
    the current panel is externally (ie: when integrating with a
    different context).
  */
  return (
    <TabPanel id={recipientId} className="grid gap-4 md:grid-cols-[1.75fr_1fr]">
      <CurrentStats />
      <CurrentRange />
    </TabPanel>
  );
}

/** @description Displays the stats of the current recipient. */
function CurrentStats() {
  const stat = useAtomValue(statAtom);
  const bonus = useAtomValue(bonusAtom);
  return (
    <StatList
      stats={stat}
      trust={bonus}
      className="rounded-2xl p-2 shadow-lift lg:p-4"
    />
  );
}

/** @description Displays the range of the current recipient. */
function CurrentRange() {
  const range = useAtomValue(rangeAtom);
  return <ContainedRange rangeId={range} />;
}

type RecipientLinkProps = { id: string; name: string; href: string };

/**
 * @description Link to go to recipient page - active only when the
 *  current tab is selected.
 */
export function RecipientLink({ id, name, href }: RecipientLinkProps) {
  const recipientId = useAtomValue(recipientIdAtom);
  const isSelected = recipientId === id;
  return (
    <Link
      aria-hidden={!isSelected}
      aria-label={`View more information about ${name}.`}
      tabIndex={isSelected ? 0 : -1}
      href={href}
      className={cn("size-full rounded-full shadow-lift", {
        "bg-carrot-60": isSelected,
        "pointer-events-none": !isSelected,
      })}
    >
      <TransformArrow active={isSelected} className="p-3" />
    </Link>
  );
}
