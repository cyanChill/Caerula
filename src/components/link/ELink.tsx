import type { LinkProps } from "next/link";
import Link from "next/link";

type Props = { children: React.ReactNode; className?: string } & (
  | (LinkProps & { external?: false })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { external: true })
);

export default function ELink({ children, className, ...props }: Props) {
  if (props.external) {
    const { external: _, ...linkProps } = props;
    return (
      <a className={className} {...linkProps} target="_blank">
        {children}
      </a>
    );
  }
  const { external: _, ...linkProps } = props;
  return (
    <Link className={className} {...linkProps}>
      {children}
    </Link>
  );
}
