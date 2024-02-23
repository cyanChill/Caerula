"use client";
import { useAtomValue, useSetAtom } from "jotai";

import { skillLevelAtom, maxSkillLevelAtom, setSkillLevelAtom } from "./store";

import Knob from "@/components/form/Knob";

/** @description Allows us to modify the current skill level in our Skills store. */
export function SkillLevelKnob() {
  const maxSkillLevel = useAtomValue(maxSkillLevelAtom);
  const setSkillLevel = useSetAtom(setSkillLevelAtom);
  return (
    <Knob
      label="Skill Level Selector"
      options={{
        min: 1,
        max: maxSkillLevel,
        trackWidth: `clamp(0.25rem, 12.5cqw, 0.4rem)`,
      }}
      propagateVal={setSkillLevel}
      theme={{ track: { active: "#FF5449" } }}
    />
  );
}

/** @description Icon representing the current skill level. */
export function SkillLevelIcon({ icons }: { icons: React.ReactNode[] }) {
  const skillLevel = useAtomValue(skillLevelAtom);
  return icons[skillLevel - 1];
}

/**
 * @description Renders children if skill attribute value at current
 *  skill level is greater than 0.
 */
export function SkillAttrRenderer(props: {
  data: number[];
  children: React.ReactNode;
}) {
  const skillLevel = useAtomValue(skillLevelAtom);
  if (props.data[skillLevel - 1] <= 0) return null;
  return props.children;
}

/** @description Returns the skill attribute value at current skill level. */
export function SkillAttrValue({ data }: { data: number[] }): React.ReactNode {
  const skillLevel = useAtomValue(skillLevelAtom);
  return data[skillLevel - 1];
}

/** @description Returns the skill description based on the current skill level. */
export function SkillDescription({ descriptions }: { descriptions: string[] }) {
  const skillLevel = useAtomValue(skillLevelAtom);
  return (
    <p
      dangerouslySetInnerHTML={{ __html: descriptions[skillLevel - 1] }}
      className="mb-4 whitespace-pre-line"
    />
  );
}
