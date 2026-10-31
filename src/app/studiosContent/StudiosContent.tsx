import React from "react";
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

  const catRes = await fetch(`http://localhost:5000/catagory`, {
    cache: "no-store",
  });
  const categoryCards = await catRes.json();

  const url = selectedCategory
    ? `http://localhost:5000/allFeatureds?category=${encodeURIComponent(selectedCategory)}`
    : `http://localhost:5000/allFeatureds`;

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
            {selectedCategory ? `${selectedCategory}s` : "Explore All Studios"}
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Discover and book verified professional photo studios, sound stages,
            and production suites.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 px-2">
            Filter by Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link
              href="/studios"
              className={`group relative p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
                !selectedCategory
                  ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-600/30 text-white ring-2 ring-blue-400"
                  : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-lg">
                ✨
              </div>
              <div>
                <h4 className="font-bold text-xs md:text-sm">All Spaces</h4>
                <span className="text-[10px] text-slate-300/80">View all</span>
              </div>
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
                    className={`group relative border rounded-2xl p-4 transition-all duration-300 flex items-center gap-3 ${
                      isSelected
                        ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 ring-2 ring-blue-400 scale-[1.02]"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-lg shadow-inner">
                      {cat.icon || "📁"}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-white">
                        {categoryName}
                      </h4>
                      {cat.count && (
                        <span className="text-[10px] text-slate-200">
                          {cat.count}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {selectedCategory
                ? `${selectedCategory} Results`
                : "All Available Spaces"}
              <span className="ml-2 text-xs font-normal text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                {studios?.length || 0} Found
              </span>
            </h2>
          </div>

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
