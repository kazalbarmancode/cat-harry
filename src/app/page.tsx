import BrowseCategories from "@/components/BrowseCategories/BrowseCategories";
import Featured from "@/components/featureds/Featured";
import HeroSection from "@/components/homePage/HeroSection";
import HostGuarantee from "@/components/HostGuarantee/HostGuarantee";
import { connection } from "next/server";
import { Suspense } from "react";
import { StudioLoadingSpinner } from "@/components/Loading";
import HowItWorkPage from "./how-it-work/page";

export const instant = false;

export default async function Home() {
  await connection();
  
  return (
  <div className="bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white transition-colors duration-300">
      <HeroSection />

      <Suspense fallback={<StudioLoadingSpinner text="Loading..." />}>
        <Featured />
      </Suspense>

      <Suspense fallback={<StudioLoadingSpinner text="Exploring..." />}>
        <BrowseCategories />
      </Suspense>

      <Suspense fallback={<StudioLoadingSpinner text="Loading..." />}>
        <HowItWorkPage></HowItWorkPage>
      </Suspense>

      <Suspense fallback={<StudioLoadingSpinner text="Loading..." />}>
        <HostGuarantee />
      </Suspense>
    </div>
  );
}