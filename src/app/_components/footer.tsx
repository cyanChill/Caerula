import Image from "next/image";

import { cn } from "@/lib/style";
import ELink from "@/components/link/ELink";

export default function Footer() {
  return (
    <footer className="mx-[max(1.5rem,3cqw)]">
      <ul
        className={cn(
          "flex flex-wrap items-center justify-between p-[0.5em]",
          "border-t-[0.05em] border-white/25 text-[clamp(1rem,1.15cqw,4rem)]",
        )}
      >
        <li>
          <ELink href="/" className="flex items-center gap-[0.5em] font-array">
            <Image
              aria-hidden="true"
              src="/logo.png"
              alt=""
              width={80}
              height={80}
              className="aspect-square w-[1.25em]"
            />
            Caerula
          </ELink>
        </li>
        <li>
          <ELink
            href="/disclaimer"
            className="text-[clamp(0.75rem,0.9cqw,3rem)]"
          >
            Disclaimer
          </ELink>
        </li>
      </ul>
    </footer>
  );
}
