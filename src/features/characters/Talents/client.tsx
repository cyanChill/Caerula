"use client";
import { useTalentStore } from "./store";

/** @description Returns the talent's current name. */
export function TalentName() {
  const { data } = useTalentStore();
  return <h2 className="break-anywhere">{data.name}</h2>;
}

/** @description Icon representing the promotion to use the talent. */
export function PromotionIcon(props: { icons: React.ReactNode[] }) {
  const { data } = useTalentStore();
  return props.icons[data.unlockCond.elite];
}

/** @description Indicates if the talent changes based on level. */
export function LevelVariantIndicator() {
  const { data, levelImprove } = useTalentStore();
  const unlockLvl = data.unlockCond.level;
  if (!levelImprove || unlockLvl !== levelImprove.level) return null;
  return <span className="text-neutral-60">Lv. {unlockLvl}</span>;
}

/** @description Displays an unlock/improvement condition for the talent. */
export function ConditionMessage() {
  const { isUnlocked, data, levelImprove } = useTalentStore();

  let message: string | null = null;
  if (!isUnlocked) {
    message = `Unlocked at Elite ${data.unlockCond.elite} Lv. ${data.unlockCond.level}.`;
  } else if (levelImprove && data.unlockCond.level !== levelImprove.level) {
    message = `Improved at Elite ${levelImprove.elite} Lv. ${levelImprove.level}`;
  }

  if (!message) return null;
  return <p className="text-[0.9em] text-neutral-80">{message}</p>;
}

/** @description Renders children if the talent is unlocked. */
export function ContentRenderer({ children }: { children: React.ReactNode }) {
  const { isUnlocked } = useTalentStore();
  if (!isUnlocked) return null;
  return children;
}

/** @description Icon representing the potential to use the talent. */
export function PotentialIcon({ icons }: { icons: React.ReactNode[] }) {
  const { data } = useTalentStore();
  return icons[data.potential - 1];
}

type UpgradeIconProps = { active: React.ReactNode; inactive: React.ReactNode };

/** @description Icon representing if the talent is upgradable with potentials. */
export function UpgradeIcon({ active, inactive }: UpgradeIconProps) {
  const { data, upgradable } = useTalentStore();
  if (data.potential === 1 && !upgradable.potential) return null;
  // Full opacity & glow effect if talent is no longer upgradable.
  return !upgradable.potential ? active : inactive;
}

/** @description Returns the talent description. */
export function TalentDescription() {
  const { data } = useTalentStore();
  return (
    <p
      dangerouslySetInnerHTML={{ __html: data.description }}
      className="whitespace-pre-line"
    />
  );
}
