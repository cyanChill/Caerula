import { PencilSquare } from "@/assets/svgs/shapes";

import Chip from "@/components/ui/Chip";

/** @description Returns a list of `<Chip />` populated with artist values. */
export default function ArtistChips({
  artists,
  className,
}: {
  artists: string[] | null;
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
      className={className}
    >
      {artist}
    </Chip>
  ));
}
