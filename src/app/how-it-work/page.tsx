import { Suspense } from 'react';
import HowItWorksContent from './HowItWorksContent';

const HowItWorkPage = () => {
  return (
    <section id="howItWorks" className="py-16 px-4 md:px-8 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-widest uppercase bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
            Seamless Workflow
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How Booking Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
            Reserve professional studio spaces for your creative productions in four simple steps.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-12 text-center text-blue-600 dark:text-blue-400 animate-pulse text-sm">
              Loading workflow steps...
            </div>
          }
        >
          <HowItWorksContent />
        </Suspense>
      </div>
    </section>
  );
};

export default HowItWorkPage;