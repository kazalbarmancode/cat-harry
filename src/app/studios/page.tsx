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
        <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
          <p className="text-blue-400 animate-pulse text-lg">
            Loading studios marketplace...
          </p>
        </div>
      }
    >
      <StudiosContent searchParams={searchParams} />
    </Suspense>
  );
}


