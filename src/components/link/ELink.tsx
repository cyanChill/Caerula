import type { LinkProps } from "next/link";
import Link from "next/link";

import type { WithCSS } from "@/lib/style";
import { omitKeys } from "@/utils/object";

type Props = WithCSS<{ children: React.ReactNode }> &
  (
    | (LinkProps & { external?: false })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { external: true })
  );

export default function ELink({ children, ...props }: Props) {
  if (props.external) {
    return (
      <a {...omitKeys(props, ["external"])} target="_blank">
        {children}
      </a>
    );
  }
  return <Link {...omitKeys(props, ["external"])}>{children}</Link>;
}
