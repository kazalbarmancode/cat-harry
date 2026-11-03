import AllCard from "../allCard/AllCard";
import Link from "next/link";
import FeaturedsTypes from "@/lib/types/FeaturedTypes";

interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

const StudiosContent = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams?.category || "";

  const catRes = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/catagory`, {
    cache: "no-store",
  });
  const categoryCards = await catRes.json();

  const url = selectedCategory
    ? `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/allStudioData?category=${encodeURIComponent(selectedCategory)}`
    : `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/allStudioData`;

  const res = await fetch(url, { cache: "no-store" });
  const studios: FeaturedsTypes[] = await res.json();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white py-14 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-blue-400 font-semibold text-xs tracking-widest uppercase bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
            Creative Marketplace
          </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Explore All Studios
            </h1>

          <p className="text-slate-400 text-sm md:text-base">
            Discover and book verified professional photo studios, sound stages,
            and production suites.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-slate-400/80 px-1">
            Filter by Category
          </h3>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/studios"
              className={`group relative px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-300 flex items-center gap-2 backdrop-blur-md ${
                !selectedCategory
                  ? "bg-gradient from-blue-600 to-indigo-600 border-blue-400/50 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/30"
                  : "bg-slate-900/50 border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/60"
              }`}
            >
              <span className="text-sm">✨</span>
              <span>All Spaces</span>
            </Link>

            {Array.isArray(categoryCards) &&
              categoryCards.map((cat) => {
                const categoryName = cat.name || cat.title || cat.category;
                if (!categoryName) return null;

                const queryValue = cat.slug || categoryName;
                const isSelected =
                  selectedCategory.trim().toLowerCase() ===
                  queryValue.trim().toLowerCase();

                return (
                  <Link
                    key={cat._id || categoryName}
                    href={`/studios?category=${encodeURIComponent(queryValue)}`}
                    className={`group relative px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-300 flex items-center gap-2 backdrop-blur-md ${
                      isSelected
                        ? "bg-gradient from-blue-600 to-indigo-600 border-blue-400/50 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/30 scale-[1.02]"
                        : "bg-slate-900/50 border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/60"
                    }`}
                  >
                    <span className="text-sm opacity-90 group-hover:scale-110 transition-transform duration-200">
                      {cat.icon || "📁"}
                    </span>
                    <span>{categoryName}</span>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-800/80">
          
          {!studios || studios.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/40 border border-slate-800 rounded-3xl">
              <h3 className="text-xl font-bold text-slate-300">
                No studios found for this category.
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Try selecting another category or reset filters.
              </p>
              <Link
                href="/studios"
                className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg"
              >
                Reset Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studios.map((card) => (
                <AllCard key={card._id} feat={card} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StudiosContent;
