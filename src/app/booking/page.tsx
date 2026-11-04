import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import IBooking from "@/lib/types/IBookLType";
import MyBookingsList from "@/components/BookingList";
import getTokenServar from "@/lib/getTokenServar";

async function BookingsContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

if (!user?.email) {
    return (
      <div className="text-center py-16 text-slate-900 dark:text-white transition-colors duration-300">
        <h1 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-white">
          Access Denied
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Please log in to view your bookings.
        </p>
      </div>
    );
  }
  const token = await getTokenServar()
  console.log(token)

  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/my-bookings/${user.email}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const bookings: IBooking[] = Array.isArray(data) ? data : [];

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyBookingsList initialBookings={bookings} />
      </Suspense>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
  <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">
  <div className="container mx-auto max-w-5xl py-10 px-4 md:px-6">
    <div className="mb-8">
      <h1 className="text-3xl font-normal tracking-tight text-slate-900 dark:text-white">
        My Bookings
      </h1>
      <p className="text-blue-600 dark:text-blue-400 mt-2 text-sm font-medium">
        Manage and view your upcoming travel plans
      </p>
    </div>

    <Suspense
      fallback={
        <div className="text-center py-12 text-slate-600 dark:text-slate-400 font-medium">
          Loading your bookings...
        </div>
      }
    >
      <BookingsContent />
    </Suspense>
  </div>
</div>
  );
}