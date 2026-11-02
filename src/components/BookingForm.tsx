"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import IStudioTypes from "@/lib/types/StudioTypes";
interface Props {
  studio: IStudioTypes;
}

const BookingForm = ({ studio }: Props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingDate || !userEmail || !userName) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    const bookingData = {
      studioId: studio._id,
      studioTitle: studio.title,
      image: studio.image,
      price: studio.hourlyRate || studio.price,
      location: studio.location,
      date: bookingDate,
      userEmail: userEmail,
      userName: userName,
      status: "Pending",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_BACKED_URL}/booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        },
      );

      const data = await res.json();

      if (data.success || data.insertedId) {
        toast.success("Studio booked successfully! Status: Pending");
        router.push("/booking");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (err) {
  console.error("Booking submission error:", err);
  
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error("Something went wrong!");
  }
}finally {
      setLoading(false);
    }
  };

  return (
    <div className=" dark:bg-slate-900 border  dark:border-slate-800 p-6 rounded-2xl shadow-sm h-fit">
      <h3 className="text-xl font-semibold mb-4">Book This Studio</h3>

      <form onSubmit={handleBookingSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Select Booking Date
          </label>
          <input
            type="date"
            name="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-300 dark:border-slate-300 text-sm"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors text-sm"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </Button>
      </form>
    </div>
  );
};
export default BookingForm;
