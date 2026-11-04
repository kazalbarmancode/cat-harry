export function StudioLoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-600 dark:border-t-blue-500 animate-spin"></div>
        
        <div className="absolute w-4 h-4 bg-lime-500 dark:bg-lime-400 rounded-full animate-pulse"></div>
      </div>
      
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400 tracking-wide">
        {text}
      </p>
    </div>
  );
}