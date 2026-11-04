"use client";

import IBooking from "@/lib/types/IBookLType";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, DollarSign, Trash2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import getTokenClient from "@/lib/getTokenClient";

interface BookingCardProps {
  booking: IBooking;
  onDelete?: (id: string) => void;
}

export default function BookingCard({ booking, onDelete }: BookingCardProps) {
  const {
  _id,
  studioId,
  studioTitle,
  image,
  price,
pricePerHour,
  location,
  date,
  status = "Pending",
} = booking;
const displayPrice = price || pricePerHour
  const getBadgeStyle = (currentStatus: string) => {
    switch (currentStatus) {
      case "Pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Confirmed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };
const handleDelete = async (bookingId: string) => {
  try {
    const token = await getTokenClient();

    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }
    
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/my-bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const textResponse = await res.text();
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.error("Non-JSON Response received:", textResponse);
      toast.error("Server returned an invalid response. Check backend route.");
      return;
    }

    if (res.ok && data.success) {
      toast.success("Booking deleted successfully!");
      if (onDelete) {
        onDelete(bookingId);
      }
    } else {
      toast.error(data.message || "Failed to delete booking");
    }
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Something went wrong!");
  }
};
  return (
    <div className="group relative bg-white dark:bg-linear-to-br dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-950/90 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col sm:flex-row justify-between items-stretch">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6 w-full">
        <div className="relative h-36 w-full sm:w-40 overflow-hidden rounded-2xl shrink-0 shadow-inner border border-slate-200 dark:border-slate-800">
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1590602847861-f357a9332bbc"
            }
            alt={studioTitle || "Studio"}
            fill
            sizes="(max-width: 768px) 100vw, 160px"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-black/40 via-transparent to-transparent opacity-60" />

          <span
            className={`absolute top-2.5 left-2.5 backdrop-blur-md text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-md ${getBadgeStyle(
              status,
            )}`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">
            {studioTitle || "Studio Title"}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            {location || "Location not available"}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-amber-500 dark:text-amber-400">
              <Calendar className="w-3.5 h-3.5" />
            </span>
            Date:{" "}
            <strong className="text-slate-900 dark:text-white font-medium bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
              {date}
            </strong>
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 sm:border-l border-t sm:border-t-0 border-slate-200 dark:border-slate-800/80 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 bg-slate-50 dark:bg-slate-950/30 shrink-0">
        <div className="text-left sm:text-right">
          <div className="flex items-center sm:justify-end text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            <DollarSign className="w-5 h-5 text-emerald-500 inline -mr-1" />
            {displayPrice}
            <span className="text-xs font-normal text-red-500 dark:text-red-600 ml-1">/hr</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {_id && (
           <button
             onClick={() => handleDelete(_id)} 
             className="px-3.5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 hover:border-red-500/40 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
             title="Delete Booking"
           >
             <Trash2 className="w-4 h-4" />
             <span className="hidden xs:inline">Remove</span>
           </button>
          )}

          {studioId && (
            <Link
              href={`/studios/${studioId}`}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 active:scale-95 flex items-center gap-1.5 group/btn"
            >
              <span>View Studio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
