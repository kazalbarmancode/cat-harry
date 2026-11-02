import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function StudioDetailsPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
          <p className="text-blue-400 animate-pulse text-lg">Loading studio details...</p>
        </div>
      }
    >
      <StudioDetailsContent params={params} />
    </Suspense>
  );
}

async function StudioDetailsContent({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKED_URL}/featureds/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Studio Not Found!</h1>
        <Link href="/studios" className="text-blue-400 underline">
          Back to Studios
        </Link>
      </div>
    );
  }

  const studio = await res.json();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/studios" className="hover:text-blue-400 transition-colors">
            Studios
          </Link>
          <span>/</span>
          <span className="text-blue-400 truncate max-w-xs">{studio?.title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {studio?.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              {studio?.title}
            </h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2 text-sm md:text-base">
              <span>📍 {studio?.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl w-fit">
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Rate</span>
              <span className="text-2xl font-extrabold text-blue-400">
                ${studio?.pricePerHour}
              </span>
              <span className="text-xs text-slate-400">/hr</span>
            </div>
            <div className="h-8  bg-slate-800" />
            <div>
              <span className="text-xs text-slate-400 block">Rating</span>
              <span className="text-lg font-bold text-amber-400 flex items-center gap-1">
                ★ {studio?.rating || "4.9"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div className="relative w-full h-95 md:h-120 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <Image
                src={studio?.image || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc"}
                alt={studio?.title || "Studio Image"}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-center">
                <span className="text-slate-400 text-xs block">Studio Size</span>
                <span className="text-lg font-bold text-white">
                  {studio?.sqft ? `${studio.sqft} sqft` : "N/A"}
                </span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-center">
                <span className="text-slate-400 text-xs block">Max Capacity</span>
                <span className="text-lg font-bold text-white">
                  {studio?.capacity ? `${studio.capacity} People` : "N/A"}
                </span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-center col-span-2 md:col-span-1">
                <span className="text-slate-400 text-xs block">Location Type</span>
                <span className="text-lg font-bold text-white">Indoor Studio</span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-3">
              <h2 className="text-xl font-bold text-white">About Space</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {studio?.description ||
                  "A professional and fully-equipped creative space designed for high-end photography, podcasting, and video productions."}
              </p>
            </div>

            {studio?.amenities && studio.amenities.length > 0 && (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-4">
                <h2 className="text-xl font-bold text-white">Amenities & Gear</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {studio.amenities.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                    >
                      <span className="text-blue-400">✔</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 ">
            
            <div className="bg-blue-950 from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6  top-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400">Hourly Rate</span>
                  <div className="text-3xl font-extrabold text-white">
                    ${studio?.pricePerHour}
                    <span className="text-sm font-normal text-slate-400">/hr</span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Instant Booking
                </span>
              </div>

             <Link href={'/booking'}>
              <button className="w-full py-4 bg-blue-600 from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98]">
                Request Booking
              </button>
             </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}