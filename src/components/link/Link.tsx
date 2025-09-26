import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";

import type { WithCSS } from "@/lib/style";

export type LinkProps = WithCSS<{ children: React.ReactNode }> &
  Omit<NextLinkProps, "prefetch"> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link(props: LinkProps) {
  return <NextLink prefetch={false} {...props} />;
}
