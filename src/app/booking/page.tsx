import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import IBooking from "@/lib/types/IBookLType";
import MyBookingsList from "@/components/BookingList";


async function BookingsContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="text-center py-16 text-white">
        <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
        <p className="text-slate-400 text-sm">
          Please log in to view your bookings.
        </p>
      </div>
    );
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKED_URL}/my-bookings/${user.email}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const bookings: IBooking[] = Array.isArray(data) ? data : [];

  return (
    <div>
      <Suspense fallback={ <div>Loading...</div> }>
        <MyBookingsList initialBookings={bookings} />;
      </Suspense>
    </div>
  );
}
export default function MyBookingsPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-normal tracking-tight text-white">
          My Bookings
        </h1>
        <p className="text-blue-500 mt-2 text-sm">
          Manage and view your upcoming travel plans
        </p>
      </div>

      <Suspense
        fallback={
          <div className="text-center py-12 text-slate-400">
            Loading your bookings...
          </div>
        }
      >
        <BookingsContent />
      </Suspense>
    </div>
  );
}
