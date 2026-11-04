"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import IStudioTypes from "@/lib/types/StudioTypes";
import getTokenClient from "@/lib/getTokenClient";

interface Props {
  studio: IStudioTypes;
  userEmail?: string;
  userName?: string;
}

const BookingForm = ({ studio, userEmail }: Props) => {
  const [name, setName] = useState("");
  const [email] = useState(userEmail || "");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!userEmail) {
      toast.error("Please log in first to book this studio.");
      setLoading(false);
      return;
    }

    const bookingData = {
      studioId: studio._id,
      studioTitle: studio.title,
      image: studio.image,
      location: studio.location,
      date: bookingDate,
      userName: name,
      userEmail: userEmail,
      status: "Pending",
    };

    try {
      const token = await getTokenClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(bookingData),
    });

      const data = await res.json();
      if (res.ok && (data.success || data.acknowledged || data.insertedId)) {
        toast.success("Studio booked successfully!");
        router.push("/booking");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to book");
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm h-fit transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        Book This Studio
      </h3>

      <form onSubmit={handleBookingSubmit} className="space-y-4">
        {/* Your Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        {/* Your Email (Disabled) */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            disabled
            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed"
            required
          />
        </div>

        {/* Select Booking Date */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            Select Booking Date
          </label>
          <input
            type="date"
            name="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors text-sm font-semibold cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
