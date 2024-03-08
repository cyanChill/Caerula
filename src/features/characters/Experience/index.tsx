import Image from "next/image";

import { type Recipient, recipientIdAtom, recipientsAtom } from "./store";

import { cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import Card from "@/components/ui/Card";
import { getPromotionIcons } from "@/components/ui/IconList";
import { Tab, TabList } from "@/components/layout/Tabs";
import * as Client from "./client"; // Fine since we're using everything

interface ExperienceProviderProps extends ExperienceProps {
  children: React.ReactNode;
}

/** @description Helps initialize our Experience store. */
export function ExperienceProvider(props: ExperienceProviderProps) {
  return (
    <HydrateAtoms
      atomValues={[
        [recipientIdAtom, props.recipients[0].id],
        [recipientsAtom, props.recipients],
      ]}
    >
      {props.children}
    </HydrateAtoms>
  );
}

type ExperienceProps = { recipients: Recipient[] };

/** @description Returns the widgets representing our Experience store. */
export default function Experience(props: ExperienceProps) {
  return (
    <>
      <LevelSelector />
      <PromotionSelector />
      <StatsWidget {...props} />
    </>
  );
}

/**
 * @description Widget allowing modification of the current level in our
 *  Experience store.
 */
function LevelSelector() {
  return (
    <Card
      as="section"
      defaultPadding
      className="relative aspect-square bg-neutral-10/75 @container"
    >
      <div className="absolute-center grid w-min text-center">
        <span className="text-[7cqw] font-bold leading-none text-neutral-80">
          LEVEL
        </span>
        <span className="font-array text-[50cqw] font-semibold leading-none">
          <Client.CurrentLevel />
        </span>
      </div>
      <Client.LevelKnob />
    </Card>
  );
}

/**
 * @description Widget allowing modification of the current promotion in
 *  our Experience store.
 */
function PromotionSelector() {
  return (
    <Card
      as="section"
      defaultPadding
      className={cn(
        "@container md:row-start-2 lg:row-start-auto",
        "grid aspect-square grid-cols-[minmax(0,1fr)_auto] gap-2 bg-[#364232]/75",
      )}
    >
      <Client.PromotionIcon
        icons={getPromotionIcons({
          size: 64,
          altBuilder: (val) => `Elite ${val}`,
          className: "aspect-square size-full object-contain",
          variant: "large",
        })}
      />
      <Client.PromotionSlider />
    </Card>
  );
}

/**
 * @description Displays the stats & current range of the current recipient
 *  at the current level & promotion.
 */
function StatsWidget(props: ExperienceProps) {
  return (
    <Card
      as="section"
      defaultPadding
      className={cn(
        "col-span-2 row-span-2 @container md:col-span-3",
        "grid grid-rows-[auto_minmax(0,1fr)] gap-4 bg-neutral-20/75",
      )}
    >
      <Client.StatsTabsProvider
        tabKeys={props.recipients.map(({ id }) => id)}
        StatsTabList={<RecipientList {...props} />}
      />
    </Card>
  );
}

/** @description List of recipients that we can view the stats for. */
function RecipientList({ recipients }: ExperienceProps) {
  return (
    <div className="row-start-2 grid items-center gap-4 @xl:grid-cols-[auto_minmax(0,1fr)]">
      <SpeakerGrill />
      <TabList
        label="Available Stat Recipients"
        className="grid grid-cols-autoFill gap-2 @container sm:grid-cols-3"
      >
        {recipients.map(({ id, name, href, iconId }) => (
          <Tab
            key={id}
            id={id}
            label={name}
            activeClass="bg-neutral-20"
            className={cn(
              "grid grid-cols-[2lh_minmax(0,1fr)_2lh] gap-2 rounded-md p-1 lg:p-1.5",
              "text-[clamp(0.75rem,2.25cqw,1rem)] shadow-lift transition duration-500 hover:bg-neutral-20",
            )}
          >
            <Image
              src={`/images/character/avatar/${iconId}.webp`}
              alt=""
              width={48}
              height={48}
              className="size-full rounded-md shadow-lift"
            />
            <span className="break-anywhere line-clamp-2 text-start">
              {name}
            </span>
            <Client.RecipientLink {...{ id, name, href }} />
          </Tab>
        ))}
      </TabList>
    </div>
  );
}

function SpeakerGrill() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 190 190"
      fill="none"
      className="hidden size-[20cqw] text-[#C6BEAC] @xl:block"
    >
      <defs>
        <g id="short-row" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="5" r="4.25" />
          <circle cx="65" cy="5" r="4.25" />
          <circle cx="80" cy="5" r="4.25" />
          <circle cx="95" cy="5" r="4.25" />
          <circle cx="110" cy="5" r="4.25" />
          <circle cx="125" cy="5" r="4.25" />
          <circle cx="140" cy="5" r="4.25" />
        </g>
        <g id="mid-row" stroke="currentColor" strokeWidth="1.5">
          <circle cx="20" cy="5" r="4.25" />
          <circle cx="35" cy="5" r="4.25" />
          <use xlinkHref="#short-row" />
          <circle cx="155" cy="5" r="4.25" />
          <circle cx="170" cy="5" r="4.25" />
        </g>
        <g id="full-row" stroke="currentColor" strokeWidth="1.5">
          <circle cx="5" cy="5" r="4.25" />
          <use xlinkHref="#mid-row" />
          <circle cx="185" cy="5" r="4.25" />
        </g>
      </defs>

      <use xlinkHref="#short-row" y="0" />
      <use xlinkHref="#mid-row" y="15" />
      <use xlinkHref="#mid-row" y="30" />
      <use xlinkHref="#full-row" y="45" />
      <use xlinkHref="#full-row" y="60" />
      <use xlinkHref="#full-row" y="75" />
      <use xlinkHref="#full-row" y="90" />
      <use xlinkHref="#full-row" y="105" />
      <use xlinkHref="#full-row" y="120" />
      <use xlinkHref="#full-row" y="135" />
      <use xlinkHref="#mid-row" y="150" />
      <use xlinkHref="#mid-row" y="165" />
      <use xlinkHref="#short-row" y="180" />
    </svg>
  );
}
