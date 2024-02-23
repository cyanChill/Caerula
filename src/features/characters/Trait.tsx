import Image from "next/image";

import type { BranchId, Profession } from "@/data/types/AKClass";
import { BranchTable } from "@/data/types/AKClass";

import { cn } from "@/lib/style";
import Card from "@/components/ui/Card";

interface Props {
  profession: Profession;
  branchId: BranchId;
  is1Star?: boolean;
}

const extraFlavor =
  ' and ignores the <span style="color:#00B0FF;">Deployment Limit</span>, but has a long Redeployment Time';

/** @description Displays the trait of an operator's branch. */
export default function Trait({ profession, branchId, is1Star }: Props) {
  const { name, trait } = BranchTable[branchId];

  const isTHRMEX = branchId === "executor" && is1Star;
  let traitMsg = `${trait}${is1Star ? extraFlavor : ""}`;
  if (isTHRMEX) traitMsg = "Does not attack" + extraFlavor; // Special case w/ THRM-EX

  return (
    <Card
      as="section"
      aria-label="Branch Trait"
      className="relative col-span-2 bg-neutralAlt-10/75 p-4 @container"
    >
      <div className="grid grid-cols-[2lh_minmax(0,1fr)] text-[clamp(0.7rem,3cqw,1rem)]">
        <Image
          src={`/images/operator/subclass/sub_${branchId}_icon.webp`}
          alt=""
          width={64}
          height={64}
          className={cn(
            "mt-0.5 aspect-square size-auto object-contain p-1",
            "rounded-md bg-neutralAlt-10/75 shadow-lift",
          )}
        />
        <hgroup className="ml-[1ch]">
          <h2 className="text-[1.25em] text-neutral-80">{name}</h2>
          <p className="text-neutral-60">{profession}</p>
        </hgroup>

        <p
          className={cn(
            "col-span-2 my-1 text-[1.15em] font-bold text-carrot-60",
            "before:mr-1.5 before:inline-block before:size-[0.4em] before:bg-current",
          )}
        >
          Trait
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: traitMsg }}
          className="col-span-2 whitespace-pre-line"
        />

        {/* Backdrop Image */}
        <Image
          src={`/images/operator/class/${profession.toLowerCase()}.webp`}
          alt=""
          width={128}
          height={128}
          className="absolute bottom-0 right-0 z-[-1] aspect-square size-full object-contain object-right-bottom opacity-5"
        />
      </div>
    </Card>
  );
}
