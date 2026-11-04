import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import getTokenServar from "@/lib/getTokenServar";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function StudioDetailsPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white flex items-center justify-center transition-colors duration-300">
          <p className="text-blue-600 dark:text-blue-400 animate-pulse text-lg font-medium">
            Loading studio details...
          </p>
        </div>
      }
    >
      <StudioDetailsContent params={params} />
    </Suspense>
  );
}

async function StudioDetailsContent({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  const userEmail = session?.user?.email;
  const token = await getTokenServar();

  const studioRes = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/studioData/${id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

   if (!studioRes.ok) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white flex flex-col items-center justify-center transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-4">Studio Not Found!</h1>
        <Link href="/studios" className="text-blue-600 dark:text-blue-400 underline font-medium">
          Back to Studios
        </Link>
      </div>
    );
  }

  const studio = await studioRes.json();

  let hasBooked = false;
  if (userEmail) {
    try {
      const bookingRes = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/my-bookings/${userEmail}`,
        {
          cache: "no-store",
        },
      );
      const userBookings = await bookingRes.json();
      if (Array.isArray(userBookings)) {
        hasBooked = userBookings.some((b) => b.studioId === id);
      }
    } catch (error) {
      console.error("Failed to check existing bookings:", error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 py-10 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/studios"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Studios
          </Link>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400 truncate max-w-xs font-medium">
            {studio?.title}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {studio?.category || "Studio"}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
              {studio?.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 flex items-center gap-2 text-sm md:text-base">
              <span>📍 {studio?.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl w-fit shadow-sm">
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Rate</span>
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                ${studio?.pricePerHour}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">/hr</span>
            </div>
            <div className="h-8 bg-slate-200 dark:bg-slate-800 w-px" />
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Rating</span>
              <span className="text-lg font-bold text-amber-500 dark:text-amber-400 flex items-center gap-1">
                ★ {studio?.rating || "4.9"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative w-full h-95 md:h-120 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900">
              <Image
                src={
                  studio?.image ||
                  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc"
                }
                alt={studio?.title || "Studio Image"}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 text-xs block">
                  Studio Size
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {studio?.sqft ? `${studio.sqft} sqft` : "N/A"}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 text-xs block">
                  Max Capacity
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {studio?.capacity ? `${studio.capacity} People` : "N/A"}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center col-span-2 md:col-span-1 shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 text-xs block">
                  Location Type
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  Indoor Studio
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-3 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">About Space</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                {studio?.description ||
                  "A professional and fully-equipped creative space designed for high-end photography, podcasting, and video productions."}
              </p>
            </div>

            {studio?.amenities && studio.amenities.length > 0 && (
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Amenities & Gear
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {studio.amenities.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200"
                    >
                      <span className="text-blue-600 dark:text-blue-400 font-bold">✔</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {hasBooked ? (
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-3 shadow-xl">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Already Booked</h3>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                  You have already booked this studio.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Want to book again? Go to{" "}
                  <Link
                    href="/booking"
                    className="text-blue-600 dark:text-blue-400 underline font-semibold"
                  >
                    My Bookings
                  </Link>{" "}
                  and delete your existing booking.
                </p>
              </div>
            ) : (
              <BookingForm studio={studio} userEmail={userEmail} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
