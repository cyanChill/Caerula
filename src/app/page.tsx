import type { OperatorId } from "@/data/types/AKCharacter";
import LatestStore from "@/data/latestStore.json";
import OperatorTable from "@/data/operator/operatorTable.json";
import ProfileTable from "@/data/operator/profile/profileTable.json";
import SkinTable from "@/data/character/skinTable.json";

import { ScrollSlide } from "@/components/layout/ScrollSlide";
import { NavList } from "./_components/nav";
import OperatorPreviewTabs from "./_components/operatorPreviewTabs";
import NewArrivals from "./_components/newArrivals";

export default function Home() {
  const operators = LatestStore["latest-operator-ids"].map((id) => {
    const { slug, name, rarity, type, profession, branch } = OperatorTable[id];
    const description =
      ProfileTable.fileTable[id].find(({ title }) => title === "Profile")
        ?.text ?? "";
    return { id, slug, name, rarity, type, profession, branch, description };
  });

  const skins = LatestStore["latest-skin-ids"].map((id) => {
    const { usedBy, name, imgAlt, description, artists } =
      SkinTable.skinTable[id];
    const { name: opName, slug } = OperatorTable[usedBy as OperatorId];
    return { id, name, imgAlt, description, artists, opName, slug };
  });

  return (
    <ScrollSlide
      sections={[
        {
          id: "latest_ops",
          title: "Latest Operators",
          description:
            "View the latest operators to add to your collection and expand your strategies.",
          content: <OperatorPreviewTabs operators={operators} />,
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
  );
}
