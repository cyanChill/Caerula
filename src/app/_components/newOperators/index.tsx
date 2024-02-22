import Image from "next/image";

import { ArrowTopRight } from "@/assets/svgs/direction";
import { Pinwheel } from "@/assets/svgs/shapes";
import type { Operator } from "@/data/types/AKCharacter";

import { cn } from "@/lib/style";
import PsychedelicImg from "@/components/image/PsychedelicImg";
import Tabs, { Tab, TabList, TabPanel } from "@/components/layout/Tabs";
import ELink from "@/components/link/ELink";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Rarity from "@/features/characters/Rarity";
import { AutoNext } from "./client";

type OperatorExcerpt = Pick<
  Operator,
  "id" | "slug" | "name" | "rarity" | "type" | "profession" | "branch"
>;

interface Props {
  operators: (OperatorExcerpt & { description: string })[];
}

/**
 * @description Gives a brief overview of each of the latest operators
 *  to be added to the game.
 */
export default function NewOperators({ operators }: Props) {
  return (
    <Tabs storeId="latest-op" tabKeys={operators.map(({ id }) => id)}>
      <div className="grid">
        <CarouselIndicator
          labels={operators.map(({ id, name }) => ({ id, name }))}
        />
        <OperatorInfo operators={operators} />
      </div>
    </Tabs>
  );
}

/** @description Tablist to switch between the latest operators displayed. */
function CarouselIndicator(props: { labels: { id: string; name: string }[] }) {
  return (
    <TabList
      label="Latest Operator Carousel"
      className="flex-center row-start-2 mx-auto my-4 w-full max-w-96 flex-wrap gap-2"
    >
      <AutoNext />
      {props.labels.map(({ id, name }) => (
        <Tab
          key={id}
          id={id}
          label={name}
          activeClass="flex-1 bg-white"
          className={cn(
            "h-1.5 min-w-8 rounded-full bg-[#4D4D4D]",
            "transition-[flex,background_color] duration-700",
          )}
        />
      ))}
    </TabList>
  );
}

/**
 * @description Displays introductionary information about the displayed
 *  operator (only 1 tabpanel will be rendered).
 */
function OperatorInfo({ operators }: Props) {
  return operators.map(({ id, name, rarity, description, type, ...rest }) => (
    <TabPanel
      key={id}
      id={id}
      className="grid gap-4 @2xl:grid-cols-[auto_minmax(0,1fr)]"
    >
      <RedirectCard id={id} name={name} rarity={rarity} {...rest} />
      <Overview {...{ name, description, rarity, type }} />
    </TabPanel>
  ));
}

/**
 * @description Card displaying a snippet of the operator's highest
 *  promotion outfit, its profession & branch, along with a link button
 *  to view more information.
 */
function RedirectCard(props: Omit<OperatorExcerpt, "type">) {
  return (
    <Card className="mr-auto flex bg-secondary-10">
      <PsychedelicImg
        src={`/images/operator/portrait/${props.id}_${props.rarity > 3 ? 2 : 1}.webp`}
        width={180}
        height={360}
        classNames={{
          wrapper: "h-full rounded-2xl @lg:w-56",
          image: "object-cover",
        }}
      />
      <div className="flex w-[clamp(2rem,25cqw,4.5rem)] flex-col justify-evenly gap-2">
        <Image
          src={`/images/operator/class/${props.profession.toLowerCase()}.webp`}
          alt=""
          width={96}
          height={96}
          className="mt-2 p-1 @2xl:p-2"
        />
        <Image
          src={`/images/operator/subclass/sub_${props.branch}_icon.webp`}
          alt=""
          width={96}
          height={96}
          className="mb-auto p-1.5 @[15rem]:p-3"
        />
        <ELink
          aria-label={`View more information about ${props.name}.`}
          href={`/operator/${props.slug}`}
          className={cn(
            "flex-center aspect-square rounded-2xl p-1 backdrop-blur-xl @2xl:p-2",
            "scale-[85%] bg-carrot-60 transition duration-500",
            "hover:scale-100 hover:bg-carrot-70 focus:scale-100",
          )}
        >
          <ArrowTopRight thin className="size-full" />
        </ELink>
      </div>
    </Card>
  );
}

/** @description Displays a description of the operator from their profile. */
function Overview(
  props: Pick<OperatorExcerpt, "name" | "rarity" | "type"> & {
    description: string;
  },
) {
  return (
    <div className="drop-shadow-xl @container @2xl:row-span-2 @2xl:mt-48 @2xl:@container-normal">
      <div className="rounded-2xl bg-neutral-20/50 p-4 backdrop-blur-2xl @2xl:px-6">
        <p className="mb-2 font-array text-[clamp(1.5rem,5cqw,3.5rem)] font-bold leading-none tracking-wider">
          {props.name}
        </p>
        <div className="flex flex-wrap gap-2 text-[clamp(0.75rem,2cqw,1rem)] ">
          <Rarity
            rarity={props.rarity}
            size="size-[1em]"
            className="gap-[0.25em] rounded-md bg-neutral-20 px-[0.5em] py-1"
          />
          <OperatorTypeChip type={props.type} />
        </div>
      </div>
      <div className="rounded-2xl bg-neutral-10/75 p-4 backdrop-blur-2xl">
        <p className="line-clamp-6 whitespace-pre-line text-[clamp(0.8rem,1.25cqw,1.5rem)] @2xl:line-clamp-none">
          {props.description}
        </p>
      </div>
    </div>
  );
}

/** @description Renders a chip if the operator is limited. */
function OperatorTypeChip({ type }: { type: Operator["type"] }) {
  if (type !== "limited") return null;
  return (
    <Chip
      variant="bordered"
      color="tertiary"
      radius="medium"
      icon={<Pinwheel className="size-[1em]" />}
    >
      Limited
    </Chip>
  );
}
