import {
  ScrollSlide,
  ContentBorderWrapper,
} from "@/components/layout/scrollSlide";

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
          content: (
            <ContentBorderWrapper>
              <p>Latest operator content</p>
            </ContentBorderWrapper>
          ),
        },
        {
          id: "navigation",
          title: "Make Your Choice",
          description: "See what Caerula has to offer.",
          content: (
            <ContentBorderWrapper>
              <NavList />
            </ContentBorderWrapper>
          ),
        },
      ]}
    />
  );
}
