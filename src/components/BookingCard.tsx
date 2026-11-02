"use client";

import IBooking from "@/lib/types/IBookLType";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, DollarSign, Trash2 } from "lucide-react";
import toast from "react-hot-toast"; 

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
    location,
    date,
    status = "Pending",
  } = booking 

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

  const handleDeleteClick = async () => {
    if (!_id) return;
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
     
      const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKED_URL}/my-bookings/${_id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok || data.deletedCount > 0 || data.success) {
        toast.success("Booking deleted successfully!"); 
        if (onDelete) {
          onDelete(_id);
        }
      } else {
        toast.error("Failed to delete booking"); 
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 shadow-sm flex flex-col sm:flex-row justify-between items-stretch">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 w-full">
        <div className="relative h-32 w-full sm:w-36 overflow-hidden rounded-xl shrink-0">
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1590602847861-f357a9332bbc"
            }
            alt={studioTitle || "Studio"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span
            className={`absolute top-2 left-2 backdrop-blur-md text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeStyle(
              status
            )}`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-1.5 flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {studioTitle}
          </h3>
          <p className="text-sm text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-500" /> {location}
          </p>
          <p className="text-sm text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-400" /> Date:{" "}
            <strong className="text-white">{date}</strong>
          </p>
        </div>
      </div>

      <div className="p-5 sm:border-l border-t sm:border-t-0 border-slate-800 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 bg-slate-950/40 shrink-0">
        <div>
          <span className="text-2xl font-bold text-red-600 flex items-center">
            <DollarSign className="w-5 h-5 text-emerald-400 inline" />
            {price}
          </span>
          <span className="text-xs text-slate-400 pl-1">per hour</span>
        </div>

        <div className="flex items-center gap-2">
          {_id && (
            <button
              onClick={handleDeleteClick}
              className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              title="Delete Booking"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}

          {studioId && (
            <Link
              href={`/studios/${studioId}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-center"
            >
              View Studio
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}