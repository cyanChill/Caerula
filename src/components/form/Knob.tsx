"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import { useKey } from "@/hooks/useKey";

import { cn } from "@/lib/style";
import { clamp, radianToDegree } from "@/utils/math";

interface Props {
  label: string;
  options: { min: number; max: number; trackWidth?: string };
  propagateVal: (val: number) => void;
  theme?: {
    track?: { inactive?: string; active?: string };
    thumb?: string;
  };
}

const defaultOptions = {
  trackWidth: "8px",
};

const defaultTheme = {
  track: { inactive: "#C6BEAC", active: "#FF5D1F" },
  thumb: "#FFFFFF",
};

/** @description Accessible circular range component. */
export default function Knob({ label, propagateVal, options, theme }: Props) {
  const internalOptions = useMemo(() => {
    return { ...defaultOptions, ...options };
  }, [options]);
  const { min, max, trackWidth } = internalOptions;
  const internalTheme = useMemo(() => {
    return {
      track: { ...defaultTheme.track, ...theme?.track },
      thumb: theme?.thumb ?? defaultTheme.thumb,
    };
  }, [theme]);

  const thumbRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // The "Cartesian Coordinate System"

  // Position of thumb (0° is at top of circle, increases moving right).
  const [currDeg, setCurrDeg] = useState(0);
  // States for dragging range thumb.
  const [isDown, setIsDown] = useState(false);
  const [startPos, setStartPos] = useState({
    // Pointer starting position relative to screen
    pointer: { x: 0, y: 0 },
    // Thumb position in container (as cartesian coordinate system)
    //  - https://en.wikipedia.org/wiki/Cartesian_coordinate_system
    thumb: { x: 0, y: 0 },
  });

  /* Infer current value from `min`, `max`, and `currDeg`. */
  const currVal = Math.round((currDeg / 360) * (max - min) + min);

  /* Logic that helps us drag the thumb around the circle. */
  const dragMove = useCallback(
    (e: PointerEvent) => {
      if (!isDown || !thumbRef.current || !containerRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const containerEl = containerRef.current as HTMLElement;
      const [gridR, thumbR] = getRadiuses(containerEl, thumbRef.current);
      // Clamp cartesian coordinate system values to fit in unit circle.
      const cartesianClamp = (num: number) => clamp(-1 * gridR, num, gridR);

      // "current pointer position" - "initial pointer start position"
      const xWalk = e.pageX - containerEl.offsetLeft - startPos.pointer.x;
      const yWalk = e.pageY - containerEl.offsetTop - startPos.pointer.y;

      // Get degree moved from start position and fix offset from having 0°
      // physically start at 90° along w/ making sure denominator isn't 0
      const opp = startPos.thumb.y - yWalk - thumbR;
      const adj = startPos.thumb.x + xWalk;
      const mvdDeg =
        90 -
        radianToDegree(
          Math.atan(cartesianClamp(opp) / (cartesianClamp(adj) || 0.0001)),
        );
      const newDeg = mvdDeg + (Math.sign(adj) === -1 ? 180 : 0); // Fix arctan discontinuity

      setCurrDeg(newDeg);
      // Update actual val based on displayed degrees (ceil when we're
      // passed halfway to reach the "max" value easier)
      const valMod = (newDeg / 360) * (max - min);
      if (valMod > (max - min) / 2) propagateVal(min + Math.ceil(valMod));
      else propagateVal(min + Math.round(valMod));
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
    setCurrDeg(((newVal - min) / (max - min)) * 360);
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
          "--adjust": "calc(var(--trackWidth) * 0.25)",
          "--radius": "calc(50% - var(--trackWidth) / 2)",
        } as React.CSSProperties
      }
      className="relative aspect-square w-full touch-none rounded-full shadow-lift"
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

          const thumbEl = thumbRef.current! as HTMLElement;
          const containerEl = containerRef.current! as HTMLElement;
          const [gridR, thumbR] = getRadiuses(containerEl, thumbEl);
          const { offsetLeft: tOL, offsetTop: tOT } = thumbEl;
          const { offsetLeft: cOL, offsetTop: cOT } = containerEl;

          setIsDown(true);
          setStartPos({
            pointer: { x: e.pageX - cOL, y: e.pageY - cOT },
            thumb: { x: tOL - gridR + thumbR, y: gridR - tOT },
          });
        }}
        tabIndex={0}
        style={
          {
            "--diff": "calc(var(--radius) - var(--adjust))",
            "--currDeg": `${currDeg - 90}deg`,
            top: `calc(var(--diff) + var(--radius) * sin(var(--currDeg)))`,
            left: `calc(var(--diff) + var(--radius) * cos(var(--currDeg)))`,
            backgroundColor: internalTheme.thumb,
          } as React.CSSProperties
        }
        className={cn(
          "absolute z-[1] size-[var(--thumbWidth)] rounded-full shadow-lift",
          "outline-2 outline-primary-60 hover:cursor-grab focus:outline",
        )}
      />
      {/* Track */}
      <div
        style={
          {
            // Outer track
            backgroundImage: `conic-gradient(${internalTheme.track.active} ${currDeg}deg, ${internalTheme.track.inactive} ${currDeg}deg 360deg)`,
            // Transparent center
            maskImage: `radial-gradient(farthest-side, transparent calc(100% - var(--trackWidth)),#fff 0)`,
            WebkitMaskImage: `radial-gradient(farthest-side, transparent calc(100% - var(--trackWidth)),#fff 0)`,
          } as React.CSSProperties
        }
        className="size-full rounded-full"
      />
    </div>
  );
}

/** @description Returns the radius of the container element & thumb. */
function getRadiuses(cEl: HTMLElement, tEl: HTMLElement) {
  return [cEl.clientWidth / 2, tEl.clientWidth / 2];
}
