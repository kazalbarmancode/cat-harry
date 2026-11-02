export default function Loading() {
  return (
    <div className="container mx-auto max-w-5xl py-10 px-4 md:px-6 animate-pulse">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-slate-800 rounded-lg"></div>
        <div className="h-4 w-72 bg-slate-800/60 rounded-lg"></div>
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-stretch gap-5"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
              <div className="h-32 w-full sm:w-36 bg-slate-800 rounded-xl shrink-0"></div>
              <div className="space-y-3 flex-1 w-full">
                <div className="h-6 w-3/4 bg-slate-800 rounded"></div>
                <div className="h-4 w-1/2 bg-slate-800/60 rounded"></div>
                <div className="h-4 w-1/3 bg-slate-800/60 rounded"></div>
              </div>
            </div>
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 shrink-0">
              <div className="h-8 w-20 bg-slate-800 rounded"></div>
              <div className="flex gap-2">
                <div className="h-9 w-20 bg-slate-800 rounded-xl"></div>
                <div className="h-9 w-20 bg-slate-800 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}