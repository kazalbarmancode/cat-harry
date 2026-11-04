import AllCard from "@/app/allCard/AllCard";
import FeaturedsTypes from "@/lib/types/FeaturedTypes";
import Link from "next/link";

const Featured = async () => {
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/studioData`, {
    cache: "no-store",
   
  });
  const featureds: FeaturedsTypes[] = await res.json();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-blue-600 dark:text-blue-500 font-semibold text-sm tracking-wider uppercase">
            Top Rated Spaces
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-1">
            Featured Studios
          </h2>
        </div>
        <Link
          href="/studios"
          className="mt-4 md:mt-0 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors flex items-center gap-1"
        >
          View All Studios &rarr;
        </Link>
      </div>

      {!featureds || featureds.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
          <p className="text-slate-600 dark:text-slate-400">
            No featured studios available right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureds.map((feat, index) => (
            <AllCard key={feat._id || index} feat={feat}></AllCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default Featured;
