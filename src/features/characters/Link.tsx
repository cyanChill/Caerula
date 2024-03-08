import Image from "next/image";
import Link from "next/link";

import { type BgColor, cn } from "@/lib/style";

type CharacterLinkProps = {
  avatar: { id: string; bg: BgColor };
  href: string;
  name: string;
};

/** @description Link component displaying the character avatar & name. */
export function CharacterLink({ avatar, href, name }: CharacterLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block h-full space-y-2 rounded-md p-1.5 sm:p-2",
        "shadow-[0_0_2px_1px_rgba(144,144,148,0.25)]",
        "transition duration-500 ease-in-out hover:bg-white/5",
      )}
    >
      <Image
        src={`/images/character/avatar/${avatar.id}.webp`}
        alt=""
        width={32}
        height={32}
        className={cn(avatar.bg, "mx-auto aspect-square size-auto rounded")}
      />
      <p className="break-anywhere text-center">{name}</p>
    </Link>
  );
}
