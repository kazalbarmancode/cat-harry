import BrowseCategories from "@/components/BrowseCategories/BrowseCategories";
import Featured from "@/components/featureds/Featured";
import HeroSection from "@/components/homePage/HeroSection";
import HostGuarantee from "@/components/HostGuarantee/HostGuarantee";
import HowItWork from "@/components/howItWork/HowItWork";
import LoadingSpinner from "@/components/Loading";
import { connection } from "next/server";
import { Suspense } from "react";

export const instant = false;

export default async function Home() {
  await connection();
  
  return (
    <div className="bg-[#0B0F19] text-white">
      <HeroSection />

      <Suspense fallback={<LoadingSpinner text="Loading featured studios..." />}>
        <Featured />
      </Suspense>

      <Suspense fallback={<LoadingSpinner text="Exploring categories..." />}>
        <BrowseCategories />
      </Suspense>

      <Suspense fallback={<LoadingSpinner text="Loading how it works..." />}>
        <HowItWork />    
      </Suspense>

      <Suspense fallback={<LoadingSpinner text="Loading guarantee info..." />}>
        <HostGuarantee />
      </Suspense>
    </div>
  );
}