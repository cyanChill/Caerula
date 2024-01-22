"use client";
import { createContext, useContext, useRef } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn as useStore } from "zustand/traditional";

import type { RangeId } from "@/data/types/AKRange";
import type { CharacterBase, CharacterStat } from "@/data/types/shared";

export type Recipient = Pick<CharacterBase, "name" | "range" | "stats"> & {
  id: string;
  href: string;
  bonus?: CharacterStat;
  iconId: string;
};

interface ExperienceProps {
  recipients: Recipient[];
}

interface ExperienceState extends ExperienceProps {
  level: number;
  maxLevel: number; // The current max level based on the current promotion.

  promotion: number;
  maxPromotion: number;

  selectedRecipient: string;
  recipient: Recipient;

  // Values representing the current experience of the recipient.
  stat: CharacterStat;
  range: RangeId;
  bonus?: CharacterStat;

  actions: {
    setLevel: (lvl: number) => void;
    setPromotion: (promo: number) => void;
    selectRecipient: (id: string) => void;
  };
}

type ExperienceStore = ReturnType<typeof createExperienceStore>;

const createExperienceStore = (initProps: ExperienceProps) => {
  const recipient = initProps.recipients[0];
  const initInferredVals = {
    maxLevel: recipient.stats[0].maxLevel,
    maxPromotion: recipient.stats.length - 1,
    selectedRecipient: recipient.id,
    recipient,
    stat: recipient.stats[0].stats[0],
    range: recipient.range[0],
    bonus: recipient.bonus,
  };

  return createStore<ExperienceState>()((set) => ({
    ...initProps,
    ...initInferredVals,
    level: 1,
    promotion: 0,
    actions: {
      setLevel: (lvl: number) =>
        set(({ maxLevel, promotion, recipient }) => {
          if (lvl < 1 || lvl > maxLevel) return {};
          return {
            level: lvl,
            stat: getCurrentStats(lvl, recipient.stats[promotion]),
          };
        }),
      setPromotion: (promo: number) =>
        set(({ promotion, maxPromotion, recipient, recipients }) => {
          if (promo < 0 || promo > maxPromotion) return {};
          if (promo === promotion) return {};
          return {
            level: 1,
            promotion: promo,
            // Character max level & range may change based on current promotion.
            maxLevel: recipients[0].stats[promo].maxLevel,
            stat: getCurrentStats(1, recipient.stats[promo]),
            range: recipient.range[promo],
          };
        }),
      selectRecipient: (id: string) =>
        set(({ level, promotion, recipients }) => {
          const recipient = recipients.find((rcpt) => rcpt.id === id);
          if (!recipient) return {};
          return {
            selectedRecipient: id,
            recipient,
            // Update values to reflect new recipient.
            stat: getCurrentStats(level, recipient.stats[promotion]),
            range: recipient.range[promotion],
            bonus: recipient.bonus,
          };
        }),
    },
  }));
};

const ExperienceContext = createContext<ExperienceStore | null>(null);

/** @description Use context with Zustand to make a non-global store. */
export function ExperienceProvider({
  children,
  ...props
}: React.PropsWithChildren<ExperienceProps>) {
  const storeRef = useRef<ExperienceStore>();
  if (!storeRef.current) storeRef.current = createExperienceStore(props);
  return (
    <ExperienceContext.Provider value={storeRef.current}>
      {children}
    </ExperienceContext.Provider>
  );
}

/** @description Internal hook for accessing context. */
function useExperienceStore<T>(selector: (state: ExperienceState) => T): T {
  const store = useContext(ExperienceContext);
  if (!store) throw new Error("Cannot use outside of ExperienceProvider.");
  return useStore(store, selector);
}

/** @description Current stat of character at current level & promotion. */
function getCurrentStats(
  lvl: number,
  promoStats: CharacterBase["stats"][number],
) {
  const [startStat, endStat] = promoStats.stats;
  const lvlDiff = promoStats.maxLevel - 1;
  // Calculate the increments in the attributes that change per level-up.
  const incrementPerLvl = {
    hp: (endStat.hp - startStat.hp) / lvlDiff,
    atk: (endStat.atk - startStat.atk) / lvlDiff,
    def: (endStat.def - startStat.def) / lvlDiff,
  };
  // Calculate & return current attribute values.
  return {
    ...startStat,
    hp: Math.round(startStat.hp + incrementPerLvl.hp * (lvl - 1)),
    atk: Math.round(startStat.atk + incrementPerLvl.atk * (lvl - 1)),
    def: Math.round(startStat.def + incrementPerLvl.def * (lvl - 1)),
  };
}

/* Export selectors manually to prevent subscribing to the entire store. */
export const useLevel = () => useExperienceStore((s) => s.level);
export const useMaxLevel = () => useExperienceStore((s) => s.maxLevel);

export const usePromotion = () => useExperienceStore((s) => s.promotion);
export const useMaxPromotion = () => useExperienceStore((s) => s.maxPromotion);

export const useSelectedRecipient = () =>
  useExperienceStore((s) => s.selectedRecipient);
export const useRecipient = () => useExperienceStore((s) => s.recipient);
export const useRecipients = () => useExperienceStore((s) => s.recipients);

export const useStat = () => useExperienceStore((s) => s.stat);
export const useRange = () => useExperienceStore((s) => s.range);
export const useBonus = () => useExperienceStore((s) => s.bonus);

export const useExperienceActions = () => useExperienceStore((s) => s.actions);
