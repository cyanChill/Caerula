import Image from "next/image";

type IconProps =
  | { as: "node"; icon: React.ReactNode }
  | {
      as: "string";
      icon: string;
      alt?: string;
      width?: number;
      height?: number;
      className?: string;
    };

/** @description Returns a `ReactNode` from either a `string` or `ReactNode`. */
export default function Icon(props: IconProps) {
  if (props.as === "node") return props.icon;
  const { alt = "", width = 16, height = 16, className } = props;
  return <Image src={props.icon} {...{ alt, width, height, className }} />;
}
