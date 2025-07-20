import { Fragment } from "react";
import Image from "next/image";

import type { OperatorId } from "@/data/types/AKCharacter";
import type { ItemId, ItemCount } from "@/data/types/AKItem";
import OperatorTable from "@/data/operator/operatorTable.json";

import type { BgColor, BorderColor } from "@/lib/style";
import { cn } from "@/lib/style";
import { notEmpty } from "@/utils/array";
import Icon from "@/components/image/Icon";
import Card, { CardTitle } from "@/components/ui/Card";
import { ItemList } from "@/features/items/DepotItem";

type CostsTabProps = ReturnType<typeof getCostsTabContent>;

/** @description Displays the costs for the current operator. */
export default function CostsTab({
  promotion,
  skillLevel,
  skillMastery,
}: CostsTabProps) {
  return (
    <div className="gap-4 py-8 *:mb-4 *:break-inside-avoid-column sm:px-4 lg:columns-2">
      {!!promotion && promotion.length > 0 && (
        <CostCard
          title="Promotion"
          icon="/images/character/ui/elite/2-s.webp"
          theme={{
            surfaceBg: "bg-neutralAlt-10",
            onSurfaceBorder: "border-neutralAlt-20",
          }}
        >
          <CostGroup
            groups={promotion.map((cost, idx) => ({
              icon: `/images/character/ui/elite/${idx + 1}.webp`,
              items: cost,
              alt: `Elite ${idx + 1}`,
            }))}
          />
          <CostTotal items={promotion.flat()} />
        </CostCard>
      )}

      {!!skillLevel && skillLevel.length > 0 && (
        <CostCard
          title="Skill Upgrades"
          icon="/images/operator/infrastructure/train.webp"
          theme={{
            surfaceBg: "bg-neutral-10",
            onSurfaceBorder: "border-neutral-20",
          }}
        >
          <CostGroup
            title="Unlocked at Elite 0"
            groups={skillLevel.slice(0, 3).map((cost, idx) => ({
              icon: `/images/character/ui/skill/${idx + 2}.webp`,
              items: cost,
              alt: `Skill Level ${idx + 2}`,
            }))}
          />
          <CostGroup
            title="Unlocked at Elite 1"
            groups={skillLevel.slice(3).map((cost, idx) => ({
              icon: `/images/character/ui/skill/${idx + 5}.webp`,
              items: cost,
              alt: `Skill Level ${idx + 5}`,
            }))}
          />
          {!!skillMastery && skillMastery.length > 0 && (
            <article className="py-4">
              <Title title="Unlocked at Elite 2" />
              <div className="px-1 *:py-2 sm:px-2">
                {skillMastery.map((items, lvl) => (
                  <CostGroup
                    key={lvl}
                    titleAs="h4"
                    title={`Skill ${lvl + 1}`}
                    groups={items.map((item, mastery) => ({
                      icon: <MasteryIcon mastery={mastery + 1} />,
                      items: item,
                    }))}
                  />
                ))}
              </div>
            </article>
          )}
          <CostTotal
            items={[
              ...skillLevel.flat(),
              ...(skillMastery ?? []).flat().flat(),
            ]}
          />
        </CostCard>
      )}
    </div>
  );
}

interface CostCardProps {
  title: string;
  icon: string | React.ReactNode;
  theme: { surfaceBg: BgColor; onSurfaceBorder: BorderColor };
  children: React.ReactNode;
}

/**
 * @description Design shared between all of the content displayed in
 *  this tab.
 */
function CostCard({ title, icon, theme, children }: CostCardProps) {
  const { surfaceBg, onSurfaceBorder } = theme;
  return (
    <Card as="section" className={cn("p-4 @container", surfaceBg)}>
      <CardTitle
        icon={icon}
        breakColor={onSurfaceBorder}
        className="text-[max(1.5rem,4.5cqw)]"
      >
        {title}
      </CardTitle>
      {children}
    </Card>
  );
}

/** @description Group cost items together. */
function CostGroup(props: {
  title?: string;
  titleAs?: "h3" | "h4";
  groups: Array<{
    icon: React.ReactNode | string;
    items: ItemCount[];
    alt?: string;
  }>;
}) {
  return (
    <article className="py-4">
      {!!props.title && <Title as={props.titleAs} title={props.title} />}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
        {props.groups.map(({ icon, items, alt }, idx) => (
          <Fragment key={idx}>
            <div className="size-12 rounded-lg p-1 shadow-lift sm:size-16">
              <Icon
                {...(typeof icon === "string"
                  ? { as: "string", icon, alt, className: "size-full" }
                  : { as: "node", icon })}
              />
            </div>
            <ItemList items={items} />
          </Fragment>
        ))}
      </div>
    </article>
  );
}

/** @description Aggregate items together and list it out. */
function CostTotal({ items }: { items: ItemCount[] }) {
  const materialMap = new Map<ItemId, number>();
  items.forEach((mat) => {
    const currCnt = materialMap.get(mat.id);
    if (!currCnt) materialMap.set(mat.id, mat.count);
    else materialMap.set(mat.id, currCnt + mat.count);
  });
  const aggregatedItems = [...materialMap.entries()].map(([id, count]) => {
    return { id, count };
  });

  return (
    <article>
      <Title title="Total" />
      <ItemList items={aggregatedItems} />
    </article>
  );
}

/** @description Shorthand for a title followed by an `<hr />`. */
function Title({ title, as: As = "h3" }: { title: string; as?: "h3" | "h4" }) {
  return (
    <>
      <As>{title}</As>
      <hr className="mb-2 border-white/10" />
    </>
  );
}

/** @description Icon for skill mastery. */
function MasteryIcon({ mastery }: { mastery: number }) {
  return (
    <div className="grid aspect-square grid-rows-[minmax(0,1fr)_auto] place-items-center">
      <Image
        src={`/images/character/ui/skill/m-${mastery}.webp`}
        alt={`Skill Mastery ${mastery}`}
        width={32}
        height={32}
        className="size-full object-contain"
      />
      <div className="flex-center gap-0.5 text-[0.75rem]">
        <Image
          src={`/images/character/ui/skill/duration.webp`}
          alt=""
          width={16}
          height={16}
          className="size-[1em]"
        />
        <p>{mastery * 8}h</p>
      </div>
    </div>
  );
}

/** @description Fetches data for this component. */
export function getCostsTabContent(id: OperatorId) {
  const { stats, skills, skillLevel } = OperatorTable[id];

  const promotionCost = stats
    .map(({ evolveCost }) => evolveCost)
    .filter((arr) => !!arr && arr.length > 0);
  const skillLevelCost = skillLevel
    .map(({ cost }) => cost)
    .filter((arr) => !!arr && arr.length > 0);
  const skillMasteryCost = skills
    .map(({ masteryCost }) => masteryCost)
    // Sometimes an empty array (ie: 3-star operators)
    .filter((arr) => !!arr && arr.length > 0)
    .map((item) =>
      item
        .map(({ ingredients }) => ingredients)
        // Sometimes an empty array (ie: Integrated Strategies operators)
        .filter((arr) => !!arr && arr.length > 0),
    )
    .filter((arr) => !!arr && arr.length > 0);

  return {
    ...(notEmpty(promotionCost) ? { promotion: promotionCost } : {}),
    ...(notEmpty(skillLevelCost) ? { skillLevel: skillLevelCost } : {}),
    ...(notEmpty(skillMasteryCost) ? { skillMastery: skillMasteryCost } : {}),
  };
}
