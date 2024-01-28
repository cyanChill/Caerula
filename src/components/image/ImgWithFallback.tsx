"use client";
import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";

interface Props extends ImageProps {
  fallback: ImageProps["src"];
}

export default function ImgWithFallback({
  fallback,
  alt,
  src,
  ...props
}: Props) {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      src={error ? fallback : src}
      onError={setError}
      {...props}
    />
  );
}
