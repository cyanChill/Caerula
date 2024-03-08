import type { Operator } from "@/data/types/AKCharacter";

import Chip from "@/components/ui/Chip";

/** @description Displays the classification of an operator. */
export function OperatorTypeChip({ type }: { type: Operator["type"] }) {
  if (!type) return null;
  const { label, color, icon } = typeChipConfig[type];

  return (
    <Chip variant="bordered" color={color} radius="medium" icon={icon}>
      {label}
    </Chip>
  );
}

/** @description Configuration for the types of operators. */
const typeChipConfig = {
  limited: {
    label: "Limited",
    color: "tertiary",
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        fill="none"
        className="size-[1em]"
      >
        <path
          d="M188.64 399.713L140.205 372.631L140.226 372.596L224.777 235.201L264.106 257.225L188.64 399.713ZM136.093 142.778L211.031 0.289751L258.943 27.8911L258.917 27.9327L174.369 165.324L136.093 142.778ZM280.193 172.77L367.796 308.396L319.356 336.828H319.007L241.387 195.844L280.193 172.77ZM21.2092 234.607L182.171 239.357L183.22 283.927L21.2092 290.787V234.921V234.607ZM216.976 116.073L378.994 109.213L379.519 164.87H379.203H379.201L216.976 161.171V116.073ZM118.952 226.701L32.4033 90.546L80.1791 62.1955L157.228 204.155L118.952 226.701Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.418333"
        />
      </svg>
    ),
  },
  is: {
    label: "Integrated Strategies",
    color: "primary",
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 178 200"
        fill="none"
        className="size-[1em]"
      >
        <path
          d="M89.0007 94.8884L171.193 47.4548L89.0007 0.000488281L6.80693 47.4548L89.0007 94.8884ZM83.1206 105.073L0.927246 57.6399V152.546L83.1206 200V105.073ZM94.8812 105.073V200L177.073 152.546V57.6399L94.8812 105.073Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
} as const;
