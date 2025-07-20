import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import OperatorTable from "@/data/operator/operatorTable.json";
import ProfileTable from "@/data/operator/profile/profileTable.json";
import SkinTable from "@/data/character/skinTable.json";
import { OpSlugTable } from "@/data/operator/slugTable";
import VoiceTable from "@/data/operator/profile/voiceTable.json";

import { cn } from "@/lib/style";
import { constructMetadata } from "@/lib/metadata";
import { JotaiProvider } from "@/lib/jotai";
import { pickKeys } from "@/utils/object";
import Tabs, {
  Tab,
  TabList,
  TabPanel,
  TabPanelGroup,
} from "@/components/layout/Tabs";
import Overview, { OverviewProvider } from "./_components/overview";
import AnalysisTab, { getAnalysisTabContent } from "./_components/analysisTab";
import FilesTab, { getFilesTabContent } from "./_components/filesTab";
import CostsTab, { getCostsTabContent } from "./_components/costsTab";

interface Props {
  params: Promise<{ slug: string[] }>;
}

/** @description Statically generate routes instead of on-demand at request time. */
export function generateStaticParams() {
  return Object.values(OperatorTable).map(({ slug }) => ({
    slug: [...slug.split("/")],
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug.join("/"));
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

export default async function Operator({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug.join("/"));
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
      <JotaiProvider>
        <OverviewProvider skinIds={skins.map(({ id }) => id)}>
          <Overview
            id={opId}
            operator={{
              name: operator.displayName,
              ...pickKeys(operator, ["position", "tags", "rarity", "type"]),
            }}
            skins={skins}
            cvTable={voices}
          />

          <Tabs
            storeId="operator"
            tabKeys={EnabledTabs.map(({ id }) => id)}
            preserveContext
          >
            <div className="pointer-events-none sticky left-0 top-4 z-[1] mt-8 flex justify-center *:pointer-events-auto">
              <TabList
                label="Operator Information"
                className={cn(
                  "no-scrollbar flex max-w-[25rem] gap-2 overflow-x-auto p-2",
                  "rounded-full border-2 border-primary-30 backdrop-blur-2xl",
                )}
              >
                {EnabledTabs.map(({ id, title, iconSrc }) => (
                  <Tab
                    key={id}
                    id={id}
                    label={title}
                    activeClass="bg-primary-30"
                    className={cn(
                      "flex shrink-0 items-center gap-2 px-2 py-1",
                      "rounded-full transition duration-500 hover:bg-primary-30",
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
      </JotaiProvider>
    </main>
  );
}
