"use client";
import { useAtomValue } from "jotai";

import {
  talentAtom,
  isTalentUnlockedAtom,
  isPotUpgradableAtom,
  levelImproveAtom,
} from "./store";

/** @description Returns the talent's current name. */
export function TalentName() {
  const { name } = useAtomValue(talentAtom);
  return <h2 className="break-anywhere">{name}</h2>;
}

/** @description Icon representing the promotion to use the talent. */
export function PromotionIcon(props: { icons: React.ReactNode[] }) {
  const { unlockCond } = useAtomValue(talentAtom);
  return props.icons[unlockCond.elite];
}

/** @description Indicates if the talent changes based on level. */
export function LevelVariantIndicator() {
  const { unlockCond } = useAtomValue(talentAtom);
  const levelImprove = useAtomValue(levelImproveAtom);
  if (!levelImprove || unlockCond.level !== levelImprove.level) return null;
  return <span className="text-neutral-60">Lv. {unlockCond.level}</span>;
}

/** @description Displays an unlock/improvement condition for the talent. */
export function ConditionMessage() {
  const { unlockCond } = useAtomValue(talentAtom);
  const isTalentUnlocked = useAtomValue(isTalentUnlockedAtom);
  const levelImprove = useAtomValue(levelImproveAtom);

  let message: string | null = null;
  if (!isTalentUnlocked) {
    message = `Unlocked at Elite ${unlockCond.elite} Lv. ${unlockCond.level}.`;
  } else if (levelImprove && unlockCond.level !== levelImprove.level) {
    message = `Improved at Elite ${levelImprove.elite} Lv. ${levelImprove.level}`;
  }

  if (!message) return null;
  return <p className="text-[0.9em] text-neutral-80">{message}</p>;
}

/** @description Renders children if the talent is unlocked. */
export function ContentRenderer({ children }: { children: React.ReactNode }) {
  const isTalentUnlocked = useAtomValue(isTalentUnlockedAtom);
  if (!isTalentUnlocked) return null;
  return children;
}

/** @description Icon representing the potential to use the talent. */
export function PotentialIcon({ icons }: { icons: React.ReactNode[] }) {
  const { potential } = useAtomValue(talentAtom);
  return icons[potential - 1];
}

type UpgradeIconProps = { active: React.ReactNode; inactive: React.ReactNode };

/** @description Icon representing if the talent is upgradable with potentials. */
export function UpgradeIcon({ active, inactive }: UpgradeIconProps) {
  const { potential } = useAtomValue(talentAtom);
  const potentialUpgradable = useAtomValue(isPotUpgradableAtom);
  if (potential === 1 && !potentialUpgradable) return null;
  // Full opacity & glow effect if talent is no longer upgradable.
  return !potentialUpgradable ? active : inactive;
}

/** @description Returns the talent description. */
export function TalentDescription() {
  const { description } = useAtomValue(talentAtom);
  return (
    <p
      dangerouslySetInnerHTML={{ __html: description }}
      className="whitespace-pre-line"
    />
  );
}
