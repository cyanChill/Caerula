import type { OperatorId } from "@/data/types/AKCharacter";
import LatestStore from "@/data/latestStore.json";
import OperatorTable from "@/data/operator/operatorTable.json";
import ProfileTable from "@/data/operator/profile/profileTable.json";
import SkinTable from "@/data/character/skinTable.json";

import { JotaiProvider } from "@/lib/jotai";
import { pickKeys } from "@/utils/object";
import { ScrollSlide } from "@/components/layout/ScrollSlide";
import { NavList } from "./_components/nav";
import NewArrivals from "./_components/newArrivals";
import NewOperators from "./_components/newOperators";

export default function Home() {
  const operators = LatestStore["latest-operator-ids"].map((id) => {
    return {
      ...pickKeys(OperatorTable[id], [
        ...["id", "slug", "name", "rarity", "type", "profession", "branch"],
      ] as const),
      description:
        ProfileTable.fileTable[id].find(({ title }) => title === "Profile")
          ?.text ?? "",
    };
  });

  const skins = LatestStore["latest-skin-ids"].map((id) => {
    const skin = SkinTable.skinTable[id];
    const operator = OperatorTable[skin.usedBy as OperatorId];
    return {
      ...pickKeys(skin, ["id", "name", "imgAlt", "description", "artists"]),
      ...{ opName: operator.name, slug: operator.slug },
    };
  });

  return (
    <JotaiProvider>
      <ScrollSlide
        sections={[
          {
            id: "latest_ops",
            title: "Latest Operators",
            description:
              "View the latest operators to add to your collection and expand your strategies.",
            content: <NewOperators operators={operators} />,
            glow: `from-[#2F8E94]`,
          },
          {
            id: "latest_outfit",
            title: "New Arrivals",
            description: "Get the latest outfits for your operators.",
            content: <NewArrivals skins={skins} />,
            glow: `from-[#92942F]`,
          },
          {
            id: "navigation",
            title: "Make Your Choice",
            description: "See what Caerula has to offer.",
            content: <NavList />,
            glow: `from-[#942F2F]`,
          },
        ]}
      />
    </JotaiProvider>
  );
}
