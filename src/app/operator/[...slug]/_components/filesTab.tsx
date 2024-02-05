import { Fragment } from "react";
import Image from "next/image";

import type { OperatorId } from "@/data/types/AKCharacter";
import type { OpFile, OpParadox, OpRecord } from "@/data/types/AKOPFiles";
import type { UnlockCondition } from "@/data/types/shared";
import type { DialogueLine } from "@/data/types/AKVoice";

import type { BgColor, BorderColor, HexColor } from "@/lib/style";
import { cn } from "@/lib/style";
import { objIsType } from "@/utils/typeNarrow";
import ScrollShadow from "@/components/layout/ScrollShadow";
import Card, { CardTitle } from "@/components/ui/Card";
import { CurrentDialogue } from "./filesTab.client";

export interface FilesTabProps {
  opId: OperatorId;
  files?: OpFile[];
  dialogues?: [string, DialogueLine[]][];
  records?: OpRecord[];
  paradox?: OpParadox;
}

/** @description Displays files about the current operator. */
export default function FilesTab({ opId, ...props }: FilesTabProps) {
  return (
    <div className="grid gap-4 py-8 sm:grid-cols-2 sm:px-4">
      <File
        title="File"
        icon="/images/operator/ui/profile/painter.webp"
        theme={{
          surface: { hex: "#181C22", bg: "bg-neutralAlt-10" },
          onSurface: { bg: "bg-neutralAlt-20", border: "border-neutralAlt-20" },
        }}
        files={props.files}
      />
      {props.dialogues && (
        <CurrentDialogue
          fallback={opId}
          variants={Object.fromEntries(
            props.dialogues.map(([id, lines]) => [
              id,
              <File
                key={id}
                title="Voice Lines"
                icon="/images/operator/ui/profile/cv.webp"
                theme={{
                  surface: { hex: "#1A1C1E", bg: "bg-neutral-10" },
                  onSurface: {
                    bg: "bg-neutral-20",
                    border: "border-neutral-20",
                  },
                }}
                files={lines}
              />,
            ]),
          )}
        />
      )}
      <File
        title="Operator Records"
        icon="/images/operator/ui/profile/tape.webp"
        theme={{
          surface: { hex: "#121C2B", bg: "bg-secondary-10" },
          onSurface: { bg: "bg-secondary-20", border: "border-secondary-20" },
        }}
        files={props.records}
      />
      <File
        title="Paradox Simulation"
        icon="/images/operator/ui/profile/paradox.webp"
        theme={{
          surface: { hex: "#2D3038", bg: "bg-neutralAlt-20" },
          onSurface: { bg: "bg-neutralAlt-30", border: "border-neutralAlt-30" },
        }}
        files={props.paradox ? [props.paradox] : undefined}
      />
    </div>
  );
}

type Conditions =
  | UnlockCondition
  | { type: "trust" | "promotion"; val: number }
  | { type: "special"; val: string }
  | null;

type FileContent = {
  title: string;
  text: string | string[];
  unlockCond: Conditions;
  trustUnlock?: number;
};

interface FileProps {
  title: string;
  icon: string | React.ReactNode;
  theme: {
    surface: { hex: HexColor; bg: BgColor };
    onSurface: { bg: BgColor; border: BorderColor };
  };
  files?: FileContent[];
}

/**
 * @description Design shared between all of the content displayed in
 *  this tab.
 */
function File({ title, icon, files, theme }: FileProps) {
  const { surface, onSurface } = theme;
  if (!files || files.length === 0) return null;
  return (
    <Card as="section" className={cn("px-4 @container", surface.bg)}>
      <CardTitle
        icon={icon}
        breakColor={onSurface.border}
        className="pt-4 text-[max(1.5rem,4.5cqw)]"
      >
        {title}
      </CardTitle>
      <ScrollShadow
        color={surface.hex}
        isVertical
        blurSize="[--blurSize:1rem]"
        className="mx-1 font-geist-sans text-[clamp(0.8rem,2.5cqw,1.15rem)]"
      >
        <div className="no-scrollbar max-h-[25rem] overflow-y-auto py-4">
          {files.map(({ title, text, unlockCond, trustUnlock }, idx) => (
            <article key={idx} className="mb-2 last:mb-0">
              <div className="mb-2 overflow-clip rounded rounded-br-xl rounded-tl-xl *:px-2.5">
                <h3 className={cn("text-[1.35em] font-medium", onSurface.bg)}>
                  {title}
                </h3>
                <UnlockSegment unlock={unlockCond} trust={trustUnlock} />
              </div>
              <TextSegment text={text} breakColor={onSurface.border} />
            </article>
          ))}
        </div>
      </ScrollShadow>
    </Card>
  );
}

type UnlockSegmentProps = { unlock: Conditions; trust?: number };

/** @description Displays the unlock conditions for this segment of the file. */
function UnlockSegment({ unlock, trust }: UnlockSegmentProps) {
  if (!unlock) return null;

  let conditions: React.ReactNode = null;
  if (objIsType<UnlockCondition>("elite", unlock)) {
    conditions = (
      <>
        <UnlockFragment type="promo" val={[unlock.elite, unlock.level]} />
        {trust !== undefined && <UnlockFragment type="trust" val={trust} />}
      </>
    );
  } else {
    if (unlock.type === "promotion")
      conditions = <UnlockFragment type="promo" val={[unlock.val, 1]} />;
    else if (unlock.type === "trust")
      conditions = <UnlockFragment type="trust" val={unlock.val} />;
    else if (unlock.type === "special") conditions = "[Amiya (Guard)]";
  }

  return (
    <p className="bg-neutral-80 text-black">
      <span className="font-semibold">Requires</span> {conditions}
    </p>
  );
}

function UnlockFragment({
  type,
  val,
}: { type: "trust"; val: number } | { type: "promo"; val: [number, number] }) {
  return (
    <>
      [
      <Image
        src={`/images${type === "trust" ? "/operator/ui/profile/trust.webp" : `/character/ui/elite/${val[0]}-s.webp`}`}
        alt=""
        width={16}
        height={16}
        className="inline size-[1em] align-text-top brightness-0"
      />{" "}
      {type === "trust" ? `Trust ${val}%` : `Elite ${val[0]} Lv. ${val[1]}`}]
    </>
  );
}

type TextSegmentProps = { text: string | string[]; breakColor: BorderColor };

/** @description The text content for this segment of the file. */
function TextSegment({ text, breakColor }: TextSegmentProps) {
  const content = typeof text === "string" ? [text] : text;
  return content.map((text, idx) => {
    return (
      <Fragment key={idx}>
        {idx !== 0 && <hr className={cn("mx-4 my-2", breakColor)} />}
        <p className="mx-2 whitespace-pre-wrap text-neutral-80">{text}</p>
      </Fragment>
    );
  });
}
