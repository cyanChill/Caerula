import OperatorTable from "@/data/operator/operatorTable.json";
import SkinTable from "@/data/operator/skinTable.json";
import { OpSlugTable } from "@/data/operator/slugTable";
import VoiceTable from "@/data/operator/profile/voiceTable.json";

import Overview, { OverviewProvider } from "./_components/overview";

export default function Operator({ params }: { params: { slug: string } }) {
  const opId = OpSlugTable[params.slug];
  if (!opId) throw new Error("Invalid operator slug.");

  const operator = OperatorTable[opId];
  const skins = SkinTable.opSkinMap[opId].map(
    (skinId) => SkinTable.skinTable[skinId],
  );
  const voices = Object.fromEntries(
    VoiceTable.opVoiceMap[opId].map((cvId) => [cvId, VoiceTable.cvTable[cvId]]),
  );

  return (
    <main className="mx-auto mb-[5svh] max-w-screen-2xl p-2">
      <OverviewProvider id={opId} skins={skins} cvTable={voices}>
        <Overview name={operator.displayName} />
      </OverviewProvider>
    </main>
  );
}
