import BrowseCategories from "@/components/BrowseCategories/BrowseCategories";
import Featured from "@/components/featureds/Featured";
import HeroSection from "@/components/homePage/HeroSection";
import HostGuarantee from "@/components/HostGuarantee/HostGuarantee";
import HowItWork from "@/components/howItWork/HowItWork";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <div className="bg-[#0B0F19] min-h-screen">
        <Suspense
          fallback={
            <div className="text-center py-20 text-slate-400">
              Loading featured studios...
            </div>
          }
        >
          <Featured />
        </Suspense>
      </div>
      <div>
        <Suspense
          fallback={
            <div className="text-center py-20 text-slate-400">
              Loading Categories...
            </div>
          }
        >
          <BrowseCategories></BrowseCategories>
        </Suspense>
      </div>
      <HowItWork></HowItWork>
      <HostGuarantee></HostGuarantee>
    </div>
  );
}
