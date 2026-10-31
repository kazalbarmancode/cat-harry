import ICategoryType from "@/lib/types/ICategoryType";
import Link from "next/link";

const BrowseCategories = async () => {
    const res = await fetch(`${process.env.BACKED_URL}/catagory`, {
        cache: "no-store",
    });
    const categories: ICategoryType[] = await res.json();

    return (
       <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <span className="text-blue-400 font-semibold text-xs tracking-widest uppercase">
                        CURATED PRODUCTION CATEGORIES
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-black mt-1 tracking-tight">
                        Browse by Creative Discipline
                    </h2>
                </div>
                <Link
                    href="/studios"
                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors flex items-center gap-1 group"
                >
                    Explore All Workspaces <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {categories?.map((cat) => (
                    <Link
                        key={cat.name}
                        href={`/studios?category=${encodeURIComponent(cat.slug)}`}
                        className="group relative bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-blue-950/30 hover:-translate-y-1 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-300 shadow-inner">
                                {cat.icon}
                            </div>

                            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                                {cat.name}
                            </h3>

                            <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                                {cat.description}
                            </p>
                        </div>

                        <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors">
                            <span className="text-blue-400/90 font-semibold">Explore</span>
                            <span className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                                &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default BrowseCategories;