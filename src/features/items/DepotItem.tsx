import Image from "next/image";

import type { ItemId, ItemCount } from "@/data/types/AKItem";
import ItemTable from "@/data/gameplay/itemTable.json";

import { cn } from "@/lib/style";
import { abbrvNum } from "@/utils/math";

type DepotItemProps = {
  materialId: ItemId;
  quantity: number;
  size?: string;
  asListItem?: boolean;
};

/** @description Shorthand for displaying a item with its quantity. */
export default function DepotItem({
  materialId,
  quantity,
  size = "size-12 sm:size-16",
  asListItem = false,
}: DepotItemProps) {
  const item = ItemTable[materialId];
  const DepotItemTag = asListItem ? "li" : "div";
  return (
    <DepotItemTag className={cn("relative @container", size)}>
      <Image
        src={`/images/gameplay/item/${item.iconId}.webp`}
        alt={`${item.name}`}
        width={32}
        height={32}
        className="size-full"
      />
      <span className="absolute bottom-0 right-0 bg-neutralAlt-20 px-[1.25ch] text-[20cqw]">
        {abbrvNum(quantity)}
      </span>
    </DepotItemTag>
  );
}

type ItemListProps = { items: ItemCount[]; iconSize?: string };

/** @description Displays a list of `<DepotItem />`. */
export function ItemList({ items, iconSize }: ItemListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(({ id, count: quantity }) => (
        <DepotItem
          key={id}
          {...{ materialId: id, quantity, size: iconSize }}
          asListItem
        />
      ))}
    </ul>
  );
}
