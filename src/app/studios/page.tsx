import { Suspense } from "react";
import StudiosContent from "../studiosContent/StudiosContent";

interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default function StudiosPage({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white flex items-center justify-center transition-colors duration-300">
          <p className="text-blue-600 dark:text-blue-400 animate-pulse text-lg font-medium">
            Loading studios marketplace...
          </p>
        </div>
      }
    >
      <StudiosContent searchParams={searchParams} />
    </Suspense>
  );
}
