import type { Rarity } from "@/data/types/shared";

import type { BgColor, BorderColor, TextColor } from "@/lib/style";

/** @description Returns colors for the specified rarity. */
export function getRarityColor(rarity: Rarity): {
  bg: BgColor;
  border: BorderColor;
  text: TextColor;
} {
  switch (rarity) {
    case 1:
      return {
        bg: "bg-rarity-1",
        border: "border-rarity-1",
        text: "text-rarity-1",
      };
    case 2:
      return {
        bg: "bg-rarity-2",
        border: "border-rarity-2",
        text: "text-rarity-2",
      };
    case 3:
      return {
        bg: "bg-rarity-3",
        border: "border-rarity-3",
        text: "text-rarity-3",
      };
    case 4:
      return {
        bg: "bg-rarity-4",
        border: "border-rarity-4",
        text: "text-rarity-4",
      };
    case 5:
      return {
        bg: "bg-rarity-5",
        border: "border-rarity-5",
        text: "text-rarity-5",
      };
    case 6:
      return {
        bg: "bg-rarity-6",
        border: "border-rarity-6",
        text: "text-rarity-6",
      };
    default:
      throw new Error("Invalid rarity specified.");
  }
}
