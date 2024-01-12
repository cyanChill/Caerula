import { PencilSquare } from "@/assets/svgs/shapes";

import Chip from "@/components/ui/Chip";

/** @description Returns a list of `<Chip />` populated with artist values. */
export default function ArtistChips({
  artists,
  asList = false,
  className,
}: {
  artists: string[] | null;
  asList?: boolean;
  /** Styling applied directly to the chips. */
  className?: string;
}) {
  if (!artists) return null;
  return artists.map((artist) => (
    <Chip
      key={artist}
      variant="bordered"
      color="neutral"
      radius="medium"
      icon={<PencilSquare className="size-[1em]" />}
      asListItem={asList}
      className={className}
    >
      {artist}
    </Chip>
  ));
}
