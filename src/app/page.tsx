import LatestStore from "@/data/latestStore.json";
import OperatorTable from "@/data/operator/operatorTable.json";
import ProfileTable from "@/data/operator/profile/profileTable.json";

import { ScrollSlide } from "@/components/layout/ScrollSlide";
import { NavList } from "./_components/nav";
import OperatorPreviewTabs from "./_components/operatorPreviewTabs";

export default function Home() {
  const operators = LatestStore["latest-operator-ids"].map((id) => {
    const { slug, name, rarity, type, profession, branch } = OperatorTable[id];
    const description =
      ProfileTable.fileTable[id].find(({ title }) => title === "Profile")
        ?.text ?? "";
    return { id, slug, name, rarity, type, profession, branch, description };
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
