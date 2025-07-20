import type { ImageProps } from "next/image";
import Image from "next/image";

import { cn } from "@/lib/style";

type Props = Omit<ImageProps, "alt" | "className"> & {
  alt?: string;
  dim?: boolean;
  classNames?: { wrapper?: string; image?: string };
};

/**
 * @description Image that grows to the container size. Has a blurred
 *  gradient background covering a copy of the original image.
 */
export default function PsychedelicImg({
  alt = "",
  dim = false,
  classNames,
  ...props
}: Props) {
  return (
    <div className={cn(classNames?.wrapper, "relative overflow-clip")}>
      {/* @ts-expect-error - Typing on `...props` is broken. */}
      <Image
        alt={alt}
        {...props}
        className={cn(
          classNames?.image,
          dim ? "gradient-psychedelic-dim" : "gradient-psychedelic",
          "size-full backdrop-blur-xl",
        )}
      />
      {/* Background blur image */}
      {/* @ts-expect-error - Typing on `...props` is broken. */}
      <Image
        aria-hidden="true"
        alt={alt}
        {...props}
        className={cn(
          classNames?.image,
          "pointer-events-none absolute left-1/2 top-0 -z-[1] size-full origin-top -translate-x-1/2 scale-[200%]",
        )}
      />
    </div>
  );
}
