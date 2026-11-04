
"use client";

import HostGuaranteeTypes from "@/lib/types/HostGuaranteeTypes";

interface HostGuaranteeProps {
  guarantees: HostGuaranteeTypes;
}


const HostGuaranteeData = ({guarantees}:HostGuaranteeProps) => {
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.isArray(guarantees) &&
        guarantees.map((item) => (
          <div
            key={item._id || item.id}
            className={`group relative p-6 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between ${
              item.borderGlow || "hover:border-emerald-500/50"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-inner">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Secured
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-wide group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient from-transparent via-slate-200 dark:via-slate-700/40 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />
          </div>
        ))}
    </div>
    );
};

export default HostGuaranteeData;