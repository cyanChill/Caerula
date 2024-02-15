import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import type { OperatorId } from "@/data/types/AKCharacter";
import type { ItemCount } from "@/data/types/AKItem";
import type { Rarity } from "@/data/types/shared";
import type { DialogueLine } from "@/data/types/AKVoice";
import OperatorTable from "@/data/operator/operatorTable.json";
import ProfileTable from "@/data/operator/profile/profileTable.json";
import SkillTable from "@/data/character/skillTable.json";
import SkinTable from "@/data/character/skinTable.json";
import TokenTable from "@/data/token/tokenTable.json";
import { OpSlugTable } from "@/data/operator/slugTable";
import VoiceTable from "@/data/operator/profile/voiceTable.json";

import { cn } from "@/lib/style";
import { constructMetadata } from "@/lib/metadata";
import Tabs, {
  Tab,
  TabList,
  TabPanel,
  TabPanelGroup,
} from "@/components/layout/Tabs";
import type { Recipient } from "@/features/characters/Experience/store";
import Overview, { OverviewProvider } from "./_components/overview";
import AnalysisTab from "./_components/analysisTab";
import FilesTab from "./_components/filesTab";
import CostsTab from "./_components/costsTab";

interface Props {
  params: { slug: string[] };
}

/** @description Statically generate routes instead of on-demand at request time. */
export function generateStaticParams() {
  return Object.values(OperatorTable).map((operator) => ({
    slug: [...operator.slug.split("/")],
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug.join("/"));
  const opId = OpSlugTable[slug];

  if (!opId) {
    return {
      title: { absolute: "Operator Not Found!" },
      description: "Operator not found.",
    };
  }

  const operator = OperatorTable[opId];

  return constructMetadata({
    parentMetadata: await parent,
    title: operator.displayName,
    description:
      ProfileTable.fileTable[opId]?.find(({ title }) => title === "Profile")
        ?.text ?? "",
    route: `/operator/${operator.slug}`,
  });
}

export default function Operator({ params }: Props) {
  const slug = decodeURIComponent(params.slug.join("/"));
  const opId = OpSlugTable[slug];
  if (!opId) notFound();

  // Available tabs displayed in page
  const TabData = [
    {
      id: "analysis",
      title: "Analysis",
      iconSrc: "/images/operator/ui/profile/operator.webp",
      disabled: false,
    },
    {
      id: "files",
      title: "Files",
      iconSrc: "/images/operator/ui/profile/network.webp",
      disabled: false,
    },
    {
      id: "costs",
      title: "Costs",
      iconSrc: "/images/operator/ui/profile/depot.webp",
      disabled: false,
    },
  ];

  // Get values for the "Overview" section.
  const operator = OperatorTable[opId];
  const skins = SkinTable.charSkinMap[opId].map(
    (skinId) => SkinTable.skinTable[skinId],
  );
  const voices = Object.fromEntries(
    VoiceTable.opVoiceMap[opId].map((cvId) => [cvId, VoiceTable.cvTable[cvId]]),
  );

  // Get more information about operator
  const filesTabContent = getFilesTabContent(opId);
  const costsTabContent = getCostsTabContent(opId);

  if (Object.keys(filesTabContent).length === 0) TabData[1].disabled = true;
  if (Object.keys(costsTabContent).length === 0) TabData[2].disabled = true;

  const EnabledTabs = TabData.filter(({ disabled }) => !disabled);
  const DisabledTabs = TabData.filter(({ disabled }) => disabled);

  return (
    <main className="mx-auto mb-[5svh] max-w-screen-2xl p-2 @container">
      <OverviewProvider skinIds={skins.map(({ id }) => id)}>
        <Overview
          id={opId}
          operator={{
            name: operator.displayName,
            position: operator.position,
            tags: operator.tags,
            rarity: operator.rarity,
          }}
          skins={skins}
          cvTable={voices}
        />

        <Tabs
          storeId="operator"
          dataStore={EnabledTabs.map(({ id }) => ({ id }))}
          preserveContext
        >
          <div className="pointer-events-none sticky left-0 top-4 z-[1] mt-8 flex justify-center *:pointer-events-auto">
            <TabList
              label="Operator Information"
              className={cn(
                "no-scrollbar flex max-w-[25rem] gap-2 overflow-x-auto p-2",
                "rounded-full border-2 border-primary-50 backdrop-blur-2xl",
              )}
            >
              {EnabledTabs.map(({ id, title, iconSrc }) => (
                <Tab
                  key={id}
                  id={id}
                  label={title}
                  activeClass="bg-primary-50"
                  className={cn(
                    "flex shrink-0 items-center gap-2 px-2 py-1",
                    "rounded-full transition duration-500 hover:bg-primary-50",
                  )}
                >
                  <Image
                    src={iconSrc}
                    alt=""
                    width={16}
                    height={16}
                    className="size-[1.5em]"
                  />
                  {title}
                </Tab>
              ))}
              {DisabledTabs.map(({ id, title, iconSrc }) => (
                <div
                  key={id}
                  aria-hidden="true"
                  className="flex shrink-0 items-center gap-2 rounded-full px-2 py-1 opacity-50"
                >
                  <Image
                    src={iconSrc}
                    alt=""
                    width={16}
                    height={16}
                    className="size-[1.5em]"
                  />
                  {title}
                </div>
              ))}
            </TabList>
          </div>
          <TabPanelGroup>
            <TabPanel id="analysis">
              <AnalysisTab {...getAnalysisTabContent(opId)} />
            </TabPanel>
            <TabPanel id="files">
              <FilesTab opId={opId} {...filesTabContent} />
            </TabPanel>
            <TabPanel id="costs">
              <CostsTab {...costsTabContent} />
            </TabPanel>
          </TabPanelGroup>
        </Tabs>
      </OverviewProvider>
    </main>
  );
}

/** @description Returns boolean if array is defined & not empty. */
function notEmpty(arr: unknown[] | undefined) {
  return !!arr && arr.length > 0;
}

/** @description Fetches data for our "Analysis" tab. */
function getAnalysisTabContent(id: OperatorId) {
  const operator = OperatorTable[id];
  return {
    affiliation: operator.affiliation,
    profession: operator.profession,
    branch: operator.branch,
    potentials: operator.potentials,
    talents: operator.talents,
    statRecipients: [
      {
        id: operator.id,
        href: `/operator/${operator.slug}`,
        name: operator.displayName,
        range: operator.range,
        stats: operator.stats,
        bonus: operator.trustBonus,
        iconId: operator.id,
      },
      ...(operator.tokensUsed ?? []).map((tokenId) => {
        const { id, slug, displayName, range, stats, iconId } =
          TokenTable[tokenId];
        return {
          ...{ id, range, stats, iconId },
          href: `/token/${slug}`,
          name: displayName,
        };
      }),
    ] as Recipient[],
    skills: operator.skills.map(({ id, tokenUsed }) => ({
      ...SkillTable[id],
      ...(tokenUsed ? { tokenName: TokenTable[tokenUsed].displayName } : {}),
    })),
  };
}

/** @description Fetches data for our "Files" tab. */
function getFilesTabContent(id: OperatorId) {
  const filesContent = ProfileTable.fileTable[id];
  const dialoguesContent = VoiceTable.opVoiceMap[id].map(
    (dId) => [dId, VoiceTable.dialogueTable[dId]] as [string, DialogueLine[]],
  );
  const recordsContent = ProfileTable.recordTable[id];
  const paradoxContent = ProfileTable.paradoxTable[id];

  return {
    ...(notEmpty(filesContent) ? { files: filesContent } : {}),
    ...(notEmpty(dialoguesContent) ? { dialogues: dialoguesContent } : {}),
    ...(notEmpty(recordsContent) ? { records: recordsContent } : {}),
    ...(!!paradoxContent ? { paradox: paradoxContent } : {}),
  };
}

/** @description Fetches data for our "Costs" tab. */
function getCostsTabContent(id: OperatorId) {
  const { stats, skills, skillLevel, rarity, type } = OperatorTable[id];

  const promotionCost = stats
    .map(({ evolveCost }, idx) => {
      if (idx === 0) return evolveCost; // 1st value is always an empty array
      // Add LMD cost to promotion cost since it's currently not included
      const LMDCost: ItemCount = {
        id: "4001",
        count: getLMDCost(rarity, "promo", idx),
      };
      return [...(type !== "is" ? [LMDCost] : []), ...evolveCost];
    })
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

/** @description Returns the LMD cost given specific parameter values. */
function getLMDCost(rarity: Rarity, type: "promo" | "module", stage?: number) {
  if (type === "promo") {
    if (rarity < 3) return 0;
    if (rarity === 3) return 10000;
    if (stage === 1) return 10000 + 2 ** (rarity - 4) * 5000;
    else return 60000 * (rarity - 3) * (stage! - 1);
  } else if (type === "module") {
    if (rarity < 4 || !stage || stage < 1) return 0;
    const baseCost = 2 ** (rarity - 3) * 10000;
    const additCost = 2 ** (rarity - 4) * 5000 * (stage - 1);
    return baseCost + additCost;
  }
  return 0;
}
