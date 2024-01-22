"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import { useKey } from "@/hooks/useKey";

import { cn } from "@/lib/style";
import { clamp } from "@/utils/math";

interface Props {
  label: string;
  options: { min: number; max: number; trackWidth?: string };
  propagateVal: (val: number) => void;
  theme: {
    track: { inactive: string; active: string };
    thumb: string;
  };
}

const defaultOptions = {
  trackWidth: "8px",
};

/** @description Accessible vertical range component. */
export default function Slider({ label, propagateVal, options, theme }: Props) {
  const internalOptions = useMemo(() => {
    return { ...defaultOptions, ...options };
  }, [options]);
  const { min, max, trackWidth } = internalOptions;

  const thumbRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Position of thumb (0 is at the min of slider, 1 at top)
  const [progress, setProgress] = useState(0);
  // States for dragging range thumb.
  const [isDown, setIsDown] = useState(false);
  const [startPos, setStartPos] = useState({ pointer: 0, thumb: 0 });

  const progessAsPercent = progress * 100;
  /* Infer current value from `min`, `max`, and `progress`. */
  const currVal = Math.round(progress * (max - min) + min);

  /* Logic that helps us drag the thumb vertically. */
  const dragMove = useCallback(
    (e: PointerEvent) => {
      if (!isDown || !thumbRef.current || !containerRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const thumbEl = thumbRef.current as HTMLElement;
      const containerEl = containerRef.current as HTMLElement;

      const usableHeight = containerEl.clientHeight - thumbEl.clientHeight;

      // "current pointer position" - "initial pointer start position"
      const yWalk = e.pageY - containerEl.offsetTop - startPos.pointer;
      const newProgress =
        clamp(0, startPos.thumb - yWalk, usableHeight) / usableHeight;

      setProgress(newProgress);
      propagateVal(Math.floor(min + newProgress * (max - min)));
    },
    [isDown, max, min, propagateVal, startPos],
  );

  /* Prevents changes when we let go of the thumb. */
  function stopDrag(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDown(false);
  }

  useEffect(() => {
    window.addEventListener("pointermove", dragMove);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);
    return () => {
      window.removeEventListener("pointermove", dragMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };
  }, [dragMove]);

  /* Keyboard accessibility (prevent going beyond min & max). */
  function updateVal(newVal: number) {
    propagateVal(newVal);
    setProgress((newVal - min) / (max - min));
  }
  const prev = () => updateVal(currVal <= min ? min : currVal - 1);
  const next = () => updateVal(currVal >= max ? max : currVal + 1);
  useKey("ArrowDown", prev, { target: thumbRef });
  useKey("ArrowLeft", prev, { target: thumbRef });
  useKey("ArrowUp", next, { target: thumbRef });
  useKey("ArrowRight", next, { target: thumbRef });
  useKey("Home", () => updateVal(min), { target: thumbRef });
  useKey("End", () => updateVal(max), { target: thumbRef });

  return (
    <div
      ref={containerRef}
      style={
        {
          "--trackWidth": trackWidth,
          "--thumbWidth": "calc(var(--trackWidth) * 1.5)",
        } as React.CSSProperties
      }
      className="relative h-full touch-none"
    >
      {/* Slider Thumb */}
      <span
        ref={thumbRef}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currVal}
        aria-orientation="vertical"
        // Start tracking drag event when we click down on the "thumb".
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const { offsetTop: tOT, clientHeight: tCH } =
            thumbRef.current! as HTMLElement;
          const { offsetTop: cOT, clientHeight: cCH } =
            containerRef.current! as HTMLElement;

          setIsDown(true);
          // Exclude area taken up by thumb in calculations
          setStartPos({ pointer: e.pageY - cOT, thumb: cCH - tOT - tCH });
        }}
        tabIndex={0}
        style={
          {
            // Exclude height in track taken up by thumb.
            "--useableHeight":
              1 -
              (thumbRef.current?.clientHeight ?? 0) /
                (containerRef.current?.clientHeight ?? 0),
            bottom: `calc(${progessAsPercent}% * var(--useableHeight))`,
            backgroundColor: theme.thumb,
          } as React.CSSProperties
        }
        className={cn(
          "absolute left-0 z-[1] size-[var(--thumbWidth)] rounded-full shadow-lift",
          "outline-2 outline-primary-60 hover:cursor-grab focus:outline",
        )}
      />
      {/* Track */}
      <div
        style={
          {
            backgroundImage:
              "linear-gradient(to top," +
              `${theme.track.active} 0 ${progessAsPercent}%,` +
              `${theme.track.inactive} ${progessAsPercent}% 100%)`,
          } as React.CSSProperties
        }
        className="mx-[calc(0.25*var(--trackWidth))] h-full w-[var(--trackWidth)] rounded-full shadow-lift"
      />
    </div>
  );
}
