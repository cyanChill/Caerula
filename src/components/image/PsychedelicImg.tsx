import type { ImageProps } from "next/image";
import Image from "next/image";

import { cn } from "@/lib/style";

interface Props extends Omit<ImageProps, "alt" | "className"> {
  alt?: string;
  classNames?: { wrapper?: string; image?: string };
}

/**
 * @description Image that grows to the container size. Has a blurred
 *  gradient background covering a copy of the original image.
 */
export default function PsychedelicImg({
  alt = "",
  classNames,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        classNames?.wrapper,
        "relative aspect-square overflow-clip",
      )}
    >
      <Image
        alt={alt}
        {...props}
        className={cn(
          classNames?.image,
          "gradient-psychedelic size-full backdrop-blur-xl",
        )}
      />
      {/* Background blur image */}
      <Image
        aria-hidden="true"
        alt={alt}
        {...props}
        className={cn(
          classNames?.image,
          "absolute left-1/2 top-0 -z-[1] size-full origin-top -translate-x-1/2 scale-[200%]",
        )}
      />
    </div>
  );
}
