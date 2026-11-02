import BrowseCategories from "@/components/BrowseCategories/BrowseCategories";
import Featured from "@/components/featureds/Featured";
import HeroSection from "@/components/homePage/HeroSection";
import HostGuarantee from "@/components/HostGuarantee/HostGuarantee";
import LoadingSpinner from "@/components/Loading";
import { connection } from "next/server";
import { Suspense } from "react";
import HowItWorkPage from "./how-it-work/page";

export const instant = false;

export default async function Home() {
  await connection();
  
  return (
    <div className="bg-[#0B0F19] text-white">
      <HeroSection />

      <Suspense fallback={<LoadingSpinner text="Loading..." />}>
        <Featured />
      </Suspense>

      <Suspense fallback={<LoadingSpinner text="Exploring..." />}>
        <BrowseCategories />
      </Suspense>

      <Suspense fallback={<LoadingSpinner text="Loading..." />}>
        <HowItWorkPage></HowItWorkPage>
      </Suspense>

      <Suspense fallback={<LoadingSpinner text="Loading..." />}>
        <HostGuarantee />
      </Suspense>
    </div>
  );
}