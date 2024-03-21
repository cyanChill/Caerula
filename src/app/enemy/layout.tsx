import { JotaiProvider } from "@/lib/jotai";
import EnemyLookup from "./_components/enemyLookup";
import { SlotRenderer } from "./_components/slotRenderer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto mb-[5svh] max-w-screen-2xl p-2 sm:px-8">
      <Header />
      <div className="mt-20 grid gap-8 lg:grid-cols-[minmax(0,1fr)_35rem]">
        <JotaiProvider>
          <EnemyLookup />
        </JotaiProvider>
        <SlotRenderer>{children}</SlotRenderer>
      </div>
    </main>
  );
}

function Header() {
  return (
    <>
      <h1 className="mb-8 mt-[15svh] text-4xl font-semibold sm:mt-[25svh] sm:text-5xl md:text-7xl">
        Enemy
      </h1>
      <div className="space-y-4 font-geist-sans text-sm text-neutral-70 sm:text-base md:text-xl">
        <p>
          The objective is to defeat and prevent enemies from entering the{" "}
          <span className="text-primary-70">Protection Objective</span>. There
          are <span className="text-primary-70">3</span> classes of enemies from
          various races, with some having special abilities that you need to
          watch out for.
        </p>
        <p>
          This acts as a general reference for information on a given enemy. For
          more accurate data on a specific enemy, look at the enemy entry for
          the given stage in-game.
        </p>
      </div>
    </>
  );
}
