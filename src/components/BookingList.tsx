"use client";

import { useState } from "react";
import BookingCard from "./BookingCard";
import IBooking from "@/lib/types/IBookLType";

export default function MyBookingsList({ initialBookings }: { initialBookings: IBooking[] }) {
  const [bookings, setBookings] = useState<IBooking[]>(initialBookings);

  const handleDelete = (id: string) => {
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/40 shadow-sm transition-colors duration-300">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          No bookings found for your account.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {bookings.map((booking) => (
        <BookingCard booking={booking} key={booking._id} onDelete={handleDelete} />
      ))}
    </div>
  );
}