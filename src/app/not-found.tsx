import Link from "next/link";
import { Home, Mic2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 transition-colors duration-300">
      <div className="relative mb-6">
        <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-xl"></div>
        <div className="relative h-24 w-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xl dark:shadow-2xl">
          <Mic2 className="w-12 h-12 animate-bounce" />
        </div>
      </div>

      <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 px-3 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full">
        404 Error
      </span>

      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
        Studio Not Found
      </h1>
      
      <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm mb-8">
        The studio space or page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 active:scale-95 cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}