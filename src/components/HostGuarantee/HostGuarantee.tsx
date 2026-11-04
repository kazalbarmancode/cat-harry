import { Suspense } from "react";
import GuaranteeContent from "./GuaranteeContent";


       const HostGuarantee = async () => {
   return (
    <section className="py-20 px-4 md:px-8 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            Trust & Safety
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Host Guarantee & Creator Support
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
            Book and host with absolute peace of mind backed by our industry-leading safety standards.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-12 text-center text-emerald-600 dark:text-emerald-400 animate-pulse text-sm">
              Loading security assurances...
            </div>
          }
        >
          <GuaranteeContent />
        </Suspense>

      </div>
    </section>
   )
};

export default HostGuarantee;