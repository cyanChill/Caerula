"use client";
import Image from "next/image";
import Link from "next/link";

import { SpeakerGrill } from "@/assets/svgs/shapes";

import {
  type Recipient,
  useLevel,
  useMaxLevel,
  usePromotion,
  useMaxPromotion,
  useSelectedRecipient,
  useRecipients,
  useStat,
  useRange,
  useBonus,
  useExperienceActions,
} from "./Experience.store";

import { cn } from "@/lib/style";
import TransformArrow from "@/components/accents/TransformArrow";
import Tabs from "@/components/layout/Tabs";
import Knob from "@/components/form/Knob";
import Slider from "@/components/form/Slider";
import StatList from "@/features/characters/StatList";
import { ContainedRange } from "@/features/characters/RangePattern";

/** @description Returns the widgets representing our Experience store. */
export default function Experience() {
  return (
    <>
      <LevelSelector />
      <PromotionSelector />
      <StatDisplay />
    </>
  );
}

/**
 * @description Widget allowing modification of the current level in our
 *  Experience store.
 */
function LevelSelector() {
  const level = useLevel();
  const maxLevel = useMaxLevel();
  const promotion = usePromotion();
  const { setLevel } = useExperienceActions();

  return (
    <section className="card relative aspect-square bg-neutral-10/75 p-2 @container sm:p-4">
      <div
        className={cn(
          "absolute left-1/2 top-1/2 grid w-min",
          "-translate-x-1/2 -translate-y-1/2 text-center",
        )}
      >
        <span className="text-[7cqw] font-bold leading-none text-neutral-80">
          LEVEL
        </span>
        <span className="font-array text-[50cqw] font-semibold leading-none">
          {level}
        </span>
      </div>
      <Knob
        key={promotion} // Refreshes internal state without useEffect
        label="Level Selector"
        options={{
          min: 1,
          max: maxLevel,
          trackWidth: `clamp(0.4rem, 7.75cqw, 1.25rem)`,
        }}
        propagateVal={setLevel}
        theme={{
          track: { inactive: "#C6BEAC", active: "#FF5D1F" },
          thumb: "#FFFFFF",
        }}
      />
    </section>
  );
}

/**
 * @description Widget allowing modification of the current promotion in
 *  our Experience store.
 */
function PromotionSelector() {
  const promotion = usePromotion();
  const maxPromotion = useMaxPromotion();
  const { setPromotion } = useExperienceActions();

  return (
    <section
      className={cn(
        "@container md:row-start-2 lg:row-start-auto",
        "card grid grid-cols-[minmax(0,1fr)_auto] gap-2 p-2 sm:p-4",
        "aspect-square bg-[#364232]/75",
      )}
    >
      <Image
        src={`/images/character/ui/elite/${promotion}.webp`}
        alt={`Elite ${promotion}`}
        width={64}
        height={64}
        className="aspect-square size-full object-contain"
      />
      <Slider
        label="Promotion Selector"
        options={{
          min: 0,
          max: maxPromotion,
          trackWidth: `clamp(0.4rem, 7.75cqw, 1.25rem)`,
        }}
        propagateVal={setPromotion}
        theme={{
          track: { inactive: "#C6BEAC", active: "#E5A530" },
          thumb: "#FFFFFF",
        }}
      />
    </section>
  );
}

/**
 * @description Displays the stats & current range of the current recipient
 *  at the current level & promotion.
 */
function StatDisplay() {
  const recipients = useRecipients();
  const { selectRecipient } = useExperienceActions();

  return (
    <section
      className={cn(
        "col-span-2 row-span-2 @container md:col-span-3",
        "card grid grid-rows-[auto_minmax(0,1fr)] gap-4 bg-neutral-20/75 p-2 sm:p-4",
      )}
    >
      <Tabs
        storeId="char-stat"
        dataStore={recipients.map(({ id }) => ({ id }))}
        onChange={(id: string) => selectRecipient(id)}
      >
        <StatDisplayContent />
      </Tabs>
    </section>
  );
}

/** @description Content of `<StatDisplay />` to reduce rerendering of `<Tabs />`. */
function StatDisplayContent() {
  const selectedRecipient = useSelectedRecipient();
  const recipients = useRecipients();
  const stat = useStat();
  const range = useRange();
  const bonus = useBonus();

  return (
    <>
      <div className="row-start-2 grid items-center gap-4 @xl:grid-cols-[auto_minmax(0,1fr)]">
        <SpeakerGrill className="hidden size-[20cqw] text-[#C6BEAC] @xl:block" />
        <Tabs.TabList
          label="Available Stat Recipients"
          className="grid grid-cols-autoFill gap-2 sm:grid-cols-3"
        >
          {recipients.map((recipient, idx) => (
            <RecipientTab
              key={idx}
              isSelected={recipient.id === selectedRecipient}
              recipient={recipient}
            />
          ))}
        </Tabs.TabList>
      </div>
      {/*
        Different way of rendering `<Tab.TabPanel />` if we know what
        the current panel is externally (ie: when integrating with a
        different context).
      */}
      <Tabs.TabPanel
        id={selectedRecipient}
        className="grid gap-4 md:grid-cols-[1.75fr_1fr]"
      >
        <StatList
          className="rounded-2xl p-2 shadow-lift lg:p-4"
          stats={stat}
          trust={bonus}
        />
        <ContainedRange rangeId={range} />
      </Tabs.TabPanel>
    </>
  );
}

/** @description Styled tab for a recipient in `<StatDisplay />`. */
function RecipientTab({
  isSelected,
  recipient: { id, name, href, iconId },
}: {
  isSelected: boolean;
  recipient: Recipient;
}) {
  return (
    <Tabs.Tab id={id} label={name} className="@container">
      <div
        className={cn(
          "grid grid-cols-[2lh_minmax(0,1fr)_2lh] gap-2 p-1 lg:p-1.5",
          "rounded-md text-[clamp(0.75rem,7cqw,1rem)] shadow-lift transition duration-500",
          { "bg-neutral-20": isSelected, "hover:bg-neutral-20": !isSelected },
        )}
      >
        <Image
          src={`/images/character/avatar/${iconId}.webp`}
          alt=""
          width={48}
          height={48}
          className="size-full rounded-md shadow-lift"
        />
        <span className="break-anywhere line-clamp-2 text-start">{name}</span>
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
      </div>
    </Tabs.Tab>
  );
}
