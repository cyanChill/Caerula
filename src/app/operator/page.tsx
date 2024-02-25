import type { Metadata, ResolvingMetadata } from "next";

import { constructMetadata } from "@/lib/metadata";
import OperatorBreakdown from "./_components/operatorBreakdown";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return constructMetadata({
    parentMetadata: await parent,
    title: "Operators",
    description: "View all the operators available on Global.",
    route: "/operator",
  });
}

export default function Operators() {
  return (
    <main className="mx-auto mb-[5svh] max-w-screen-2xl p-2 @container sm:px-8">
      <Header />
      <OperatorBreakdown />
    </main>
  );
}

function Header() {
  return (
    <>
      <h1 className="mb-8 mt-[15svh] text-4xl font-semibold sm:mt-[25svh] sm:text-5xl md:text-7xl">
        Operator
      </h1>
      <div className="space-y-4 font-geist-sans text-sm text-neutral-70 sm:text-base md:text-xl">
        <p>
          Operators act as towers to prevent enemies from reaching the{" "}
          <span className="text-primary-70">Protection Objective</span>. There
          are <span className="text-primary-70">6</span> rarities of operators
          belonging to one of the <span className="text-primary-70">8</span>{" "}
          professions, each divided into branches.
        </p>
        <p>
          <span className="text-primary-70">1-star</span> operators in
          particular are special as they {"don't"} count towards the{" "}
          <span className="text-primary-70">Deployment Limit</span> in exchange
          for having a long redeployment time. In addition,{" "}
          <span className="font-semibold">THRM-EX</span> has its trait modified.
        </p>
      </div>
    </>
  );
}
