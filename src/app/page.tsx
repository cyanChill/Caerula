import { ScrollSlide } from "@/components/layout/ScrollSlide";

import { NavList } from "./_components/nav";

export default function Home() {
  return (
    <ScrollSlide
      sections={[
        {
          id: "latest_ops",
          title: "Latest Operators",
          description:
            "View the latest operators to add to your collection and expand your strategies.",
          content: <p>Latest operator content</p>,
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
