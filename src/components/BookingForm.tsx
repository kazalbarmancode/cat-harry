"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import IStudioTypes from "@/lib/types/StudioTypes";

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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        },
      );

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
    <div className="dark:bg-slate-900 border dark:border-slate-800 p-6 rounded-2xl shadow-sm h-fit">
      <h3 className="text-xl font-semibold mb-4 text-white">
        Book This Studio
      </h3>

      <form onSubmit={handleBookingSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 ">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            disabled
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-300 dark:border-slate-300 text-slate-200 text-sm "
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">
            Select Booking Date
          </label>
          <input
            type="date"
            name="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
