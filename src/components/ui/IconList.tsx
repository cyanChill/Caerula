import Image from "next/image";

type IconListProps = {
  size?: number;
  altBuilder?: (val: number) => string;
  className?: string;
};

const defaultProps = { size: 32 };

interface PromoIconsProps extends IconListProps {
  variant?: "small" | "large";
}

export function getPromotionIcons(_props: PromoIconsProps) {
  const { variant = "small", ...props } = { ...defaultProps, ..._props };
  return [0, 1, 2].map((promo) => (
    <Image
      key={promo}
      src={`/images/character/ui/elite/${promo}${variant === "small" ? "-s" : ""}.webp`}
      alt={props.altBuilder ? props.altBuilder(promo) : ""}
      width={props.size}
      height={props.size}
      className={props.className}
    />
  ));
}

export function getPotentialIcons(props: IconListProps) {
  const { size, altBuilder, className } = { ...defaultProps, ...props };
  return [1, 2, 3, 4, 5, 6].map((pot) => (
    <Image
      key={pot}
      src={`/images/character/ui/potential/${pot}.webp`}
      alt={altBuilder ? altBuilder(pot) : ""}
      width={size}
      height={size}
      className={className}
    />
  ));
}

export function getSkillLevelIcons(props: Omit<IconListProps, "altBuilder">) {
  const { size, className } = { ...defaultProps, ...props };
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => {
    const iconId = lvl < 8 ? lvl : `m-${lvl - 7}`;
    const alt = lvl < 8 ? `Level ${lvl}` : `Mastery ${lvl - 7}`;
    return (
      <Image
        key={lvl}
        src={`/images/character/ui/skill/${iconId}.webp`}
        alt={`Skill ${alt}`}
        width={size}
        height={size}
        className={className}
      />
    );
  });
}
