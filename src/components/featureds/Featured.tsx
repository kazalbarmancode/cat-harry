import FeaturedsTypes from "@/lib/types/FeaturedTypes";
import Image from "next/image";
import Link from "next/link";

const Featured = async () => {
  const res = await fetch(`${process.env.BACKED_URL}/featureds`, {
    cache: "no-store",
  });
  const featureds: FeaturedsTypes[] = await res.json();
  console.log(featureds);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">
            Top Rated Spaces
          </span>
          <h2 className="text-3xl md:text-4xl font-bold  mt-1">
            Featured Studios
          </h2>
        </div>
        <Link
          href="/studios"
          className="mt-4 md:mt-0 text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1"
        >
          View All Studios &rarr;
        </Link>
      </div>

      {!featureds || featureds.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
          <p className="text-slate-400">
            No featured studios available right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureds.map((feat) => (
            <div
              key={feat._id}
              className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/20 flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={feat.image}
                  alt={feat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient from-slate-950/80 via-transparent to-transparent" />

                <span className="absolute top-4 left-4 bg-blue-600/95 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
                  {feat.category}
                </span>

                <div className="absolute top-4 right-4 bg-slate-950/75 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                  ⭐ <span>{feat.rating || 4.9}</span>
                </div>
              </div>

              <div className="p-5 flex flex-col grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                    <span>📍</span> {feat.location}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
                  <div>
                    <span className="text-2xl font-bold text-white">
                      ${feat.pricePerHour}
                    </span>
                    <span className="text-xs text-slate-400"> / hr</span>
                  </div>

                  <Link
                    href={`/studios/${feat._id}`}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Featured;
