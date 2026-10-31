import { HowItTypes } from '@/lib/types/HowItTypes';


interface HowItWorksDataProps {
  howItWork: HowItTypes[];
}
const HowItWorksData = ({howItWork}:HowItWorksDataProps) => {
   
      return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.isArray(howItWork) &&
        howItWork.map((step: HowItTypes, index: number) => {
          const accents = [
            "hover:border-blue-500/50 hover:shadow-blue-500/1",
            "hover:border-indigo-500/50 hover:shadow-indigo-500/10",
            "hover:border-teal-500/50 hover:shadow-teal-500/10",
            "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
          ];
          const currentAccent = accents[index % accents.length];

          return (
            <div
              key={step._id || step.stepNumber}
              className={`group relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${currentAccent}`}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl font-bold group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner ${step.iconBg}`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-2xl font-black tracking-tighter text-slate-700/80 group-hover:text-slate-400 transition-colors ${step.hoverNumber}`}
                >
                  {step.stepNumber}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 tracking-wide group-hover:text-blue-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed font-normal">
                {step.description}
              </p>

              <div className="absolute bottom-0 left-6 right-6  bg-gradient-to from-transparent via-slate-700/50 to-transparent group-hover:via-blue-500/50 transition-all duration-500" />
            </div>
          );
        })}
    </div>
  );
};

export default HowItWorksData;